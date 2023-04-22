import React from 'react';
import logo from '../images/logo.png';
import smile from '../images/smile.jpg';
import "../css/Home.css"

function HomePage() {
  return (
    <div className="page">
      <h1 className='welcomeCompany'>
        <span className='welcome'>Welcome to </span>
        <span className='company'>
          <span className='gray'> Atlanta </span>
          <span className='orange'>Community Food </span>
          <span className='gray'>Bank</span>
        </span>

      </h1>
      <img className='Home-logo'src={logo} />
      <div className='title'>
        <div >
          <span className='centerBrief'>The center for Community Food links households and individuals in need with essential groceries.</span>
          <span className='availableFood'>Food is available.</span>
          <button className='orderButton'>Order Now</button>
          <img className='smile' src={smile}/>
        </div>

        <div className='brief'>
        <p >The Atlanta Community Food Bank is a non-profit organization that provides access to nutritious food for
          people in need across the metro Atlanta area. They work with a network of partner agencies 
          and programs to distribute food to those who are struggling with hunger. 
          Their mission is to fight hunger by engaging, educating, and empowering the community, and their vision is 
          a hunger-free community. Customers can order food through the Atlanta Community Food 
          Bank's partner agencies and programs, or they can get involved by volunteering, donating,
          or advocatinclassName='title'g for food justice.
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;