import React, { useState, useEffect } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const[pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function (response) {
            const { data} = response;
            setPokemon(data);
        })
        .catch(function (error) {
            setPokemon(false);
        });
    }, [pokemonId]);

    const generatePokemonJSX = (pokemon) => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default;
        const { front_default } = sprites;
        return (
            <>
                <Typography style={{ textAlign: "center" }} variant="h1">
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <div style={{ display: "grid", display: "block", marginRight: "auto", marginLeft: "auto", padding: "2rem", width: "100%", maxWidth: "1140px", maxHeight: "400px", padding: "8rem 6rem", display: "flex", alignItems: "center", background: "rgb(0 0 0 / 38%)", boxShadow: "0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1)", borderRadius: "2rem", border: "1px solid rgba(255, 255, 255, 0.125)" }}>
                <img style={{ display: "block", marginRight: "auto", marginLeft: "20px", width: "500px", height: "500px" }} src={fullImageUrl} />
                <Typography style={{ color: "orange", marginTop: "-285px", marginLeft: "35%", position: "absolute" }} variant="h3">Pokemon Info</Typography>
                <Typography style={{ color: "orange", fontSize: "30px", marginTop: "-124px", position: "absolute", marginLeft: "36%" }}>
                    {"Species: "}
                    <Link style={{ color: "white" }}href={species.url}>{species.name} </Link>
                </Typography>
                <Typography style={{ textAlign: "center", color: "orange", fontSize: "30px", marginTop: "-7px", marginLeft: "39%", position: "absolute" }}>Height: {height} </Typography>
                <Typography style={{ textAlign: "center", color: "orange", fontSize: "30px", marginLeft: "39%", marginTop: "35px", marginTop: "126px", position: "absolute" }}>Weight: {weight} </Typography>
                <Typography style={{ textAlign: "center", color: "orange", fontSize: "30px", marginTop: "245px", marginRight: "29%" }} variant="h6"> Types:</Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    return <Typography style={{ textAlign: "center", color: "orange", fontSize: "30px", marginTop: "242px", position: "absolute", marginLeft: "43%" }} key={name}> {`${name}`}</Typography>;
                })}
                </div>
            </>
        );
    };  
    return (
    <> 
        {pokemon === undefined && <CircularProgress style={{ display: "block", marginRight: "auto", marginLeft: "auto", marginTop: "20%", color: "white" }} />}
        {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
        {pokemon === false && <Typography>Pokemon not found</Typography>}
        {pokemon !== undefined && (
            <Button style={{ left: "1540px", bottom: "50px" }} variant="contained" onClick={() => history.push("/")}>
                Back
            </Button>
        )}
    </>
    );
};

export default Pokemon;