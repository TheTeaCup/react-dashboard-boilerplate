import api from '../meta/api'; 

const Home = () => {

    return (
        <div>
          <h3 href={api.getOauth()}>
            Login
          </h3>
        </div>
    )
}

export default Home;
