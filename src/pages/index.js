import api from '../meta/api'; 

const Home = () => {

    return (
        <div>
            { user ? ( 
                <h3 href="/me"> Account </h3>
            ) : (
                <h3 href={api.getOauth()}> Login </h3>
            )}
        </div>
    )
}

export default Home;
