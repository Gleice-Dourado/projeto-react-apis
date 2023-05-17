import { BigDetail, CardDetail, PokeId, PokemonDetailStyle, SmallDetail, PokeName, PokeInfo, PokeImg, PokeMoves, FirstColumn, PokeGolpes } from "./pokemonDetailStyle"
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header"
import { Title } from "../PokedexPage/pokedexStyle"
import pokeball from '../../assets/pngwing 1.png'
import pokeball2 from '../../assets/pngwing 2.png'
import { SmallPokeball, BigPokeball } from "./pokemonDetailStyle"
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../Constants/url";
import axios from 'axios';
import { TypesContainer } from "../../Components/PokemonCard/pokemonCardStyle";
import { PokemonType } from "../../Components/PokemonCard/pokemonCardStyle";
import { getTypes } from "../../utils/ReturnPokemonType";

export default function PokemonDetailPage (){
    const {pokemonId} = useParams();
    const [pokemonDetails, setPokemonDetails]= useState(null);

    

    useEffect(()=>{
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${pokemonId}`)
                setPokemonDetails(response.data);
                console.log(response.data)
            } catch (error) {
                console.log('Algo errado aconteceu!')
                console.log(error)
            }
        }
        fetchPokemonDetails();
    }, [pokemonId])

    if (!pokemonDetails) {
        return null;
      }
   return (
   <div>
        <Header/>
        <Title>Detalhes</Title>
        <PokemonDetailStyle>
            <BigPokeball src={pokeball} alt=''/>
            <CardDetail>
                <FirstColumn>
                    <SmallDetail src={pokemonDetails.sprites.front_default} alt=''/>
                    <SmallDetail src={pokemonDetails.sprites.back_default} alt=''/>
                </FirstColumn>
                <BigDetail>
                    <h2>Base Stats</h2>
                    <table>
                        <tbody>
                        {pokemonDetails.stats[0] ? (
                            <>
                            {pokemonDetails.stats.map((stats) => (
                                <tr key={stats.stat.name}>
                                <td>{stats.stat.name}</td>
                                <td>{stats.base_stat}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>Total</td>
                                <td>
                                {pokemonDetails.stats.reduce(
                                    (total, stats) => total + stats.base_stat,
                                    0
                                )}
                                </td>
                            </tr>
                            </>
                        ) : (
                            <tr>
                            <td colSpan="2">Carregando...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </BigDetail>
                

                <PokeInfo>
                    <PokeId>#{pokemonDetails.id}</PokeId>
                    <PokeName>{pokemonDetails.name}</PokeName>
                    <TypesContainer>
                        {pokemonDetails.types ? (
                        pokemonDetails.types.map((type) => {
                            
                            return <PokemonType key={type.type.name} src={getTypes(type.type.name)} alt='' />
                        })
                        ) : (
                        <div>Carregando...</div>
                        )}
                    </TypesContainer>
                    <PokeMoves>
                        <h2>Moves:</h2>
                        {pokemonDetails.abilities[0] ? (
                            pokemonDetails.abilities.map((ability)=>{
                            return <PokeGolpes key={ability.ability.name}> {ability.ability.name}</PokeGolpes>})
                        
                        ) : (
                        <div>Carregando...</div>
                        )}
                    </PokeMoves>
                </PokeInfo>
                <PokeImg src={pokemonDetails.sprites.other['official-artwork'].front_default} alt=''></PokeImg>
            </CardDetail>
        </PokemonDetailStyle>
   </div>
   )
}