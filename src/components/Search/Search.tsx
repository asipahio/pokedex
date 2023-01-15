import React, { FC, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectHistory } from '../../services/pokemon';
import { LinkContainer } from 'react-router-bootstrap';

interface SearchProps
{
    keyword?: string
}

const Search: FC<SearchProps> = ({ keyword }) =>
{
    const navigate = useNavigate();
    const [name, setName] = useState<string>(keyword || "");
    const searchHistory = useSelector(selectHistory);

    useEffect(() =>
    {
        keyword && setName(keyword);
    }, [keyword])

    const onSubmit = (event: any) =>
    {
        event.preventDefault();
        navigate(`/search/${name}`);
    }

    return (
        <Form className={styles.Search + " h-100 w-100 d-flex align-items-center justify-content-center"} data-testid="Search" onSubmit={onSubmit}>
            <InputGroup>
                <Form.Control
                    placeholder="Pokemon Name"
                    aria-label="Pokemon Name"
                    aria-describedby="Name of the pokemon to search for"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name}
                />
                {
                    searchHistory && searchHistory.length > 0 &&
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary-outline"></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Header>History</Dropdown.Header>
                            <Dropdown.Divider></Dropdown.Divider>
                            {searchHistory.map((key: string, index: number) =>
                                <LinkContainer to={`/search/${key}`} key={index}>
                                    <Dropdown.Item>{key}</Dropdown.Item>
                                </LinkContainer>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                }
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </InputGroup>

        </Form>
    )
};

export default Search;
