import { FC, useEffect } from 'react';
import { Alert, Badge, Col, Nav, Navbar, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Move, Type } from '../../@types/IPokemon';
import { append, useGetEvolutionChainQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesQuery } from '../../services/pokemon';
import Search from '../Search/Search';
import styles from './Results.module.scss';
import { LinkContainer } from 'react-router-bootstrap'

interface ResultsProps { }

const Results: FC<ResultsProps> = () =>
{
    const params = useParams();
    const key = params.key!;

    const { data, error } = useGetPokemonByNameQuery(key)
    const { data: species } = useGetPokemonSpeciesQuery(key);
    const { data: evolution } = useGetEvolutionChainQuery(species?.evolution_chain?.url || "", { skip: species === undefined });
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(append(key))
    }, [key, dispatch])

    const getLevel = (level: number) =>
    {
        if (data === undefined || evolution === undefined) {
            return undefined;
        }
        const currentIndex = evolution?.findIndex((pokemonName: string) => pokemonName === data!.species!.name);
        const levelIndex = level + currentIndex;
        if (currentIndex === -1 || (levelIndex < 0 || levelIndex > evolution.length - 1)) {
            return undefined;
        }
        return evolution[levelIndex];
    }

    return (
        <div className={styles.Results} data-testid="Results">
            <Navbar>
                <LinkContainer to="/"><Navbar.Brand>Home</Navbar.Brand></LinkContainer>
                <Search keyword={key} />
            </Navbar>

            <Row>
                {error &&
                    <Alert key='danger' variant='danger'>No pokemon found!</Alert>
                }
                {data &&
                    <Col md={{ offset: 3, span: 6 }}>
                        <div className={styles.ImgContainer}>
                            <img id="update_img" src={data.sprites.other!.dream_world.front_default} alt={data.species.name} />
                        </div>
                        <div className={styles.DetailContainer}>
                            <div className="title-container">
                                <Nav variant="pills">
                                    {
                                        getLevel(-1) &&
                                        <Nav.Item>
                                            <LinkContainer to={`/search/${getLevel(-1)}`}>
                                                <Nav.Link>
                                                    {getLevel(-1)} &laquo;
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Nav.Item>}
                                    <Nav.Item><Nav.Link disabled href="#">{data.species.name}</Nav.Link></Nav.Item>
                                    {
                                        getLevel(1) &&
                                        <Nav.Item>
                                            <LinkContainer to={`/search/${getLevel(1)}`}>
                                                <Nav.Link>
                                                    &raquo; {getLevel(1)}
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Nav.Item>
                                    }
                                </Nav>
                                <hr className="seperator" />
                                <div className="stats text-center">
                                    <span className="cp-text col-md-6" id="update_cp">XP {data.base_experience}</span>
                                </div>
                            </div>
                            <div className="attributes-container">
                                <div className={styles.Attribute}>
                                    <p className={styles.AttributeText} id="update_type">
                                        {data.types.map((type: Type, index: number) =>
                                            <span key={index}><Badge pill bg="info">{type.type.name}</Badge> </span>
                                        )}
                                    </p>
                                    <small className="text-muted">Type</small>
                                </div>
                                <div className={styles.Attribute}>
                                    <p className={styles.AttributeText} id="update_weight">{data.weight}</p>
                                    <small className="text-muted">Weight</small>
                                </div>
                                <div className={styles.Attribute}>
                                    <p className={styles.AttributeText} id="update_height">{data.height}</p>
                                    <small className="text-muted">Height</small>
                                </div>
                                <div className={styles.Attribute}>
                                    <p className={styles.AttributeText} id="update_type">
                                        {data.moves.map((move: Move, index: number) =>
                                            <span key={index}><Badge pill bg="info">{move.move.name}</Badge> </span>
                                        )}
                                    </p>
                                    <small className="text-muted">Moves</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                }
            </Row>
        </div>
    )
};

export default Results;
