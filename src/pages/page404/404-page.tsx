import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const StyledPage404 = styled.div`
  width: 40%;
  margin: 150px auto;
  padding: 50px;
  text-align: center;
  color: #2b2d30;
  background-color: #efeff1;
  a {
    color: #599fdb;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: bold;

    &:hover {
      color: #7b7ecd;
    }
  }
  `;

function Page404(): JSX.Element {
  return (
    <StyledPage404>
      <div>
        <Helmet>
          <title>404</title>
        </Helmet>
        <h2>Oops! This page was not found</h2>
        <Link to={AppRoute.Root}>To main page</Link>
      </div>
    </StyledPage404>
  );
}

export default Page404;
