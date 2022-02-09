import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import PokeCard from "./PokeCard";

function FavList({ favHandler, favourites }) {
  console.log(favourites);
  return (
    <div>
      <Container>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between my-5 d-flex gap-3"
        >
          {favourites.map((pokemon) => (
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
    </div>
  );
}

export default FavList;
