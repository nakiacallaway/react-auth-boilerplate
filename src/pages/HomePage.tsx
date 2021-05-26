import userEvent from '@testing-library/user-event';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../context/GlobalContext';

const HomePage = () => {
  const {users, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
    console.log(users);
  }, []);

  return (
    <div id='home'>
      <div className='row text-center mt-5'>
        <div className='col'>
          <h2>Welcome to some really cool startup</h2>
          <h4 className='text-secondary'>
            Take a look at some of our other users!
          </h4>
        </div>
      </div>
      <div className='row text-center'>
        <div className='col-6 offset-3'>
          <ul className='list-group'>
            {users?.map((user:User, i:number) => {
            return <li key={i}> {user.firstName}{' '}{user.lastName} </li>
          })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
