import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import MovieDetailedViewSection from "../MovieDetailedViewSection"

const UserProfile = () => {
  const { id } = useParams(); 

  return (
    <>
        <Navbar />
        <div>
            <MovieDetailedViewSection movieId={id} />
        </div>
    </>
  );
}

export default UserProfile;


