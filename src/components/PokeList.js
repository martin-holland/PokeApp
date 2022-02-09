import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import PokeCard from "./PokeCard";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

const PokeList = ({ favHandler, favourites }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPokemons, setNextPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    axios
      .get(nextPokemons)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        const fetches = res.data.results.map((p) =>
          axios.get(p.url).then((res) => res.data)
        );

        setNextPokemons(res.data.next);

        Promise.all(fetches).then((data) => {
          setPokemons((prevState) => [...prevState, ...data]);
        });
        setIsLoading(false);
        console.log(pokemons);
        console.log(nextPokemons);
      });
  };

  return (
    <div>
      <Container>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between my-5 d-flex gap-3"
        >
          {isLoading && <Loader />}
          {!isLoading &&
            pokemons.map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                pokemonName={pokemon.name}
                fav={favourites.some((item) => item.name === pokemon.name)}
                favClick={() => favHandler(pokemon)}
              />
            ))}
        </Row>
      </Container>
      <Button variant="primary" size="lg" onClick={getPokemons}>
        Load more
      </Button>
    </div>
  );
};

export default PokeList;
