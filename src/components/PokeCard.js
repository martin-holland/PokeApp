import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";
import { HeartFill } from "react-bootstrap-icons";

const PokeCard = ({ name, image, pokemonName, fav, favClick }) => {
  return (
    <Card bg="dark" text="light" key={name}>
      <Card.Header className="capitalize d-flex justify-content-between">
        {name}
        {fav ? (
          <HeartFill onClick={favClick} color="red" />
        ) : (
          <Heart onClick={favClick} color="white" />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={image} style={{ height: "12rem" }} />
        <Container
          className="mt-2 d-flex align-items-center"
          style={{ width: "100%" }}
        >
          <LinkContainer to={`/${pokemonName}`}>
            <div class="col-md-12 ml-1 text-center">
              <Button style={{ width: "100%" }} variant="secondary" size="sm">
                Details
              </Button>
            </div>
          </LinkContainer>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default PokeCard;
