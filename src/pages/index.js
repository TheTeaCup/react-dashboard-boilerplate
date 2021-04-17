import api from '../meta/api'; 

const Home = () => {

    let user = localStorage.getItem('user');

    return (
        <div>
            { user ? ( 
                <a href="/me"> Account </a>
            ) : (
                <a href={api.getOauth()}> Login </a>
            )}
        </div>
    )
}

export default Home;
