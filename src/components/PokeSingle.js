import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

function PokeSingle(props) {
  let { pokemonName } = useParams();
  let navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
      .then(function (response) {
        setPokemonData(response.data);
        console.log(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Container className="d-flex justify-content-center p-5">
          <Card
            className="d-flex align-items-center"
            style={{ width: "50vw" }}
            bg="dark"
            text="light"
          >
            <Card.Header className="capitalize d-flex justify-content-center">
              {pokemonData.name}
            </Card.Header>
            <Card.Body className="d-flex">
              <Card.Img
                style={{ width: "20vw" }}
                variant="top"
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                }
              />
            </Card.Body>
            <div className="stats">
              <p>Pokemon Id: {pokemonData.id}</p>
              Abilities:{" "}
              <ul>
                {pokemonData.abilities.map((entry) => (
                  <li key={entry.slot} className="abilities">
                    {entry.ability.name}
                  </li>
                ))}
              </ul>
              <p>Base Experience: {pokemonData.base_experience}</p>
              <p>Height: {pokemonData.height}0 m</p>
              <p>Weight: {pokemonData.weight} kg</p>
              Types:
              <ul>
                {pokemonData.types.map((type) => (
                  <li className="types" key={type.slot}>
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
            <Container class="mb-3">
              <Button style={{ width: "10vw" }} onClick={() => navigate(-1)}>
                Back to List
              </Button>
            </Container>
          </Card>
        </Container>
      )}
    </>
  );
}

export default PokeSingle;
