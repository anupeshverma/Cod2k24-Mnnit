import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setLink } from '../../actions/auth';

const Dashboard = ({ link }) => {
  const [fetch, setfetch] = useState(true);
  const [form, setform] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      const res = await axios.get('https://cod2k24-mnnit.onrender.com/api/admin/form');
      const link1 = res.data[res.data.length - 1].formLink;
      setform(link1);
      console.log(link1);
    };
    if (fetch) {
      fetchLink();
      setfetch(false);
    }
  }, [fetch]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Problem Statements</h1>
      <div className='flex flex-col space-y-2'>
        <div className='border p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>First Year</h2>
          <p>
            <a
              href='https://drive.google.com/drive/folders/1kYrFRtwRXXGAmDUo7ueWuos-ACulRO1B?usp=sharing'
              className='text-blue-500 hover:underline'
            >
              Problem
            </a>
          </p>
        </div>
        <div className='border p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Second Year</h2>
          <p>
            <a
              href='https://drive.google.com/drive/folders/1uFMBOg4xMrH-ZuER-lDAmwXU6PxJXttu?usp=sharing'
              className='text-blue-500 hover:underline'
            >
              Problem
            </a>
          </p>
        </div>
        <div className='border p-4 rounded-lg'>
          <h2 className='text-xl font-semibold'>Third Year</h2>
          <p>
            <a
              href='https://drive.google.com/drive/folders/1g-B5YvZUfIbHI8WjCaUwWJhSCo4IR-oK?usp=drive_link'
              className='text-blue-500 hover:underline'
            >
              Problem
            </a>
          </p>
        </div>
      </div>
      <div className='mt-8 p-4 bg-gray-100 rounded-lg'>
        <p className='text-lg font-semibold text-center mb-2'>
          Submit your solution
        </p>
        {console.log(form)}
        <a
          href={form}
          className='cursor-pointer block w-full py-2 px-4 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600'
        >
          Click Here
        </a>
      </div>
    </div>
  );
};

// export default Dashboard;

const mapStateToProps = (state) => ({
  link: state.auth.link,
});

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
//   isAdmin: PropTypes.bool,
// };

export default connect(mapStateToProps, { setLink })(Dashboard);
