import React from "react";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
  return (
    <main>
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <section className="sm:w-7/12">
          <Posts />
        </section>
        <section className="sm:w-4/12 h-96">
          <Form />
        </section>
      </div>
    </main>
  );
};

export default Home;
