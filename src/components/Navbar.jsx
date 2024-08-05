import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="fixed w-full z-20 text-white">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="flex flex-row items-center cursor-pointer">
            <RouterLink to="/">
              <h1 className="text-2xl font-semibold">BeatTrack</h1>
            </RouterLink>
          </div>

          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <ScrollLink
              to="home"
              spy={true}
              smooth={true.toString()}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true.toString()}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="services"
              spy={true}
              smooth={true.toString()}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="doctors"
              spy={true}
              smooth={true.toString()}
              duration={500}
              className="hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </ScrollLink>
          </nav>

          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <ScrollLink
            to="home"
            spy={true}
            smooth={true.toString()}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true.toString()}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </ScrollLink>
          <ScrollLink
            to="services"
            spy={true}
            smooth={true.toString()}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="doctors"
            spy={true}
            smooth={true.toString()}
            duration={500}
            className="hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
