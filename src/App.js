import "./app.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const fetches = res.data.results.map((p) =>
        axios.get(p.url).then((res) => res.data)
      );

      Promise.all(fetches).then((data) => {
        setPokemons(data);
        setIsLoading(false);
      });
    });
    console.log(pokemons);
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link href="#" className="text-light bg-dark">
            PokeApp
          </Nav.Link>
        </Container>
      </Navbar>
      <Container className="main">
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between my-5 d-flex gap-3"
        >
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!isLoading &&
            pokemons.map((pokemon) => (
              <Card bg="dark" text="light" key={pokemon.name}>
                <Card.Header>
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                </Card.Header>

                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={pokemon.sprites.other.dream_world.front_default}
                  />
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
