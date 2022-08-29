import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField }from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokedex = (props) => {
    const { history } = props; 
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    useEffect(() => {
    axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=1154`) //  or 807
        .then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                    id: index + 1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        index + 1
                    }.png`,
                };
            });
            setPokemonData(newPokemonData);
        });
    }, []);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const getPokemonCard = (pokemonId) => {
      const { id, name, sprite } = pokemonData[pokemonId];
      return (
        <Grid item xs={4} key={pokemonId}>
            <Card style={{ width: "410px", padding: "30px", margin: "10px", borderRadius: "40px", backgroundColor: "rgb(15 23 42)" }} onClick={() => history.push(`/${name}`)}>
                <CardMedia
                    className="cardMedia"
                    image={sprite}
                    style={{ width: "160px", height: "160px", display: "bloc", marginLeft: "auto", marginRight: "auto" }}
                />
                <CardContent className="cardContent">
                    <Typography style={{ fontSize: "2rem", textAlign: "center", color: "orange" }}>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
      );
    };

    return (
        <>
        <AppBar style={{ backgroundColor: "rgb(15 23 42)" }} position="static">
            <Toolbar style={{ margin: "3px" }}>
                <div className="searchContainer">
                    <SearchIcon className="searchIcon" />
                        <TextField style={{ backgroundColor: "white" }}
                            className="searchInput"
                            onChange={handleSearchChange} 
                            label="Pokemon" 
                            variant="standard"
                        />
                </div>
            </Toolbar>
        </AppBar><h1 style={{ textAlign: "center", color: "orange"}}>My Pokemon</h1>
        {pokemonData ? (
            <Grid style={{width: "100%", margin: "18px" }} container spacing={3} className="pokedexContainer">
                {Object.keys(pokemonData).map(
                    (pokemonId) =>
                    pokemonData[pokemonId].name.includes(filter) &&
                    getPokemonCard(pokemonId)
                )}
            </Grid>
        ) : (
           <CircularProgress />
        )}
        </>
    );
};

export default Pokedex;