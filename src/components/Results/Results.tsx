import { FC, useEffect } from 'react';
import { Alert, Badge, Col, ListGroup, Nav, Navbar, Row, Tabs, Tab, Form, ProgressBar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IAbility, IMove, IStat, IType } from '../../@types/IPokemon';
import { append, useGetEvolutionChainQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesQuery } from '../../services/pokemon';
import Search from '../Search/Search';
import styles from './Results.module.scss';
import { LinkContainer } from 'react-router-bootstrap'
import { IFlavorTextEntries } from '../../@types/IPokemonSpecies';

interface ResultsProps { }

const Results: FC<ResultsProps> = () =>
{
    const params = useParams();
    const key = params.key!;

    const { data: pokemon, error } = useGetPokemonByNameQuery(key)
    const { data: species } = useGetPokemonSpeciesQuery(key);
    const { data: evolution } = useGetEvolutionChainQuery(species?.evolution_chain?.url || "", { skip: species === undefined });
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(append(key))
    }, [key, dispatch])

    const getLevel = (level: number) =>
    {
        if (pokemon === undefined || evolution === undefined) {
            return undefined;
        }
        const currentIndex = evolution?.findIndex((pokemonName: string) => pokemonName === pokemon!.species!.name);
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
                {pokemon &&
                    <Col md={{ offset: 3, span: 6 }}>
                        <div className={styles.ImageContainer}>
                            <img id="update_img" src={pokemon.sprites.other!.dream_world.front_default} alt={pokemon.species.name} />
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
                                    <Nav.Item><Nav.Link disabled href="#">{pokemon.species.name}</Nav.Link></Nav.Item>
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
                            </div>
                            <div className="attributes-container">
                                <Form>
                                    <Tabs
                                        defaultActiveKey="Stats"
                                        className="mb-3"
                                        variant="pills"
                                    >
                                        <Tab eventKey="About" title="About">
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={4}>
                                                    XP
                                                </Form.Label>
                                                <Col sm={8}>
                                                    <Form.Control plaintext readOnly defaultValue={pokemon.base_experience} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={4}>
                                                    Type
                                                </Form.Label>
                                                <Col sm={8}>
                                                    {pokemon.types.map((type: IType, index: number) =>
                                                        <span key={index}><Badge pill bg="light" text="dark">{type.type.name}</Badge> </span>
                                                    )}
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={4}>
                                                    Weight
                                                </Form.Label>
                                                <Col sm={8}><Form.Control plaintext readOnly defaultValue={pokemon.weight} /></Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={4}>
                                                    Height
                                                </Form.Label>
                                                <Col sm={8}><Form.Control plaintext readOnly defaultValue={pokemon.height} /></Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label column sm={4}>
                                                    Abilities
                                                </Form.Label>
                                                <Col sm={8}>
                                                    {pokemon.abilities.map((ability: IAbility, index: number) =>
                                                        <span key={index}><Badge pill bg="light" text="dark">{ability.ability.name}</Badge> </span>
                                                    )}
                                                </Col>
                                            </Form.Group>
                                        </Tab>
                                        <Tab eventKey="Stats" title="Stats">
                                            {pokemon.stats.map((stat: IStat, index: number) =>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={4}>
                                                        {stat.stat.name}
                                                    </Form.Label>
                                                    <Col sm={8} className={styles.Progress}>
                                                        <ProgressBar now={stat.base_stat} label={`${stat.base_stat}%`} />
                                                    </Col>
                                                </Form.Group>
                                            )}
                                        </Tab>
                                        <Tab eventKey="Moves" title="Moves">
                                            <Row className={styles.Row}>
                                                {pokemon.moves.map((move: IMove, index: number) =>
                                                    <Col key={index} className={styles.Col}><Badge pill bg="primary">{move.move.name}</Badge> </Col>
                                                )}
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Form>
                                <small className="text-muted">Species</small>
                                <div className={styles.Species}>
                                    <ListGroup>
                                        {
                                            species &&
                                            species.flavor_text_entries &&
                                            species.flavor_text_entries
                                                .filter(t => t.language.name === "en")
                                                .map((entry: IFlavorTextEntries, index: number) =>
                                                    <ListGroup.Item>{entry.flavor_text}</ListGroup.Item>
                                                )}
                                    </ListGroup>
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
