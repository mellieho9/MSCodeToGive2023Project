import React from 'react';
import logo from '../images/logo.png';
import smile from '../images/smile.jpg';
import "../css/Home.css"

function HomePage() {
  return (
    <div className="page">
      <img className='Home-logo' src={logo} />
      <h1 className='welcomeCompany'>
        <span className='welcome'>Welcome to </span>
        <span className='company'>
          <span className='gray'> Atlanta </span>
          <span className='orange'>Community Food </span>
          <span className='gray'>Bank</span>
        </span>
      </h1>
      
      <section >
          <div className='title'>
            <img className='smile' src={smile}/>
            <h2 className='centerBrief'>The center for Community Food links households and individuals in need with essential groceries.</h2>
            <div className='availableFood'>
              <h3>Food is available </h3> 
              <button className='button'>Order Now</button>
            </div>
          </div>

                   
          <p className='brief'>The Atlanta Community Food Bank is a non-profit organization that provides access to nutritious food for
          people in need across the metro Atlanta area. Our work with a network of partner agencies 
          and programs to distribute food to those who are struggling with hunger. 
          Our mission is to fight hunger by engaging, educating, and empowering the community, and our vision is 
          a hunger-free community. Customers can order food through the Atlanta Community Food 
          Bank's partner agencies and programs, or they can get involved by volunteering, donating,
          or for food justice.
          </p>
      </section>
      
    </div>
  );
}

export default HomePage;