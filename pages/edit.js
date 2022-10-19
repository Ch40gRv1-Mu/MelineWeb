import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";

// Data
import yourData from "../data/portfolio.json";
import Cursor from "../components/Cursor";

const Edit = () => {
  // states
  const [data, setData] = useState(yourData);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const { theme } = useTheme();
  var today = new Date();

  const saveData = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  // Gallery Handler
  const editGallerys = (GalleryIndex, editGallery) => {
    let copyGallerys = data.Gallerys;
    copyGallerys[GalleryIndex] = { ...editGallery };
    setData({ ...data, Gallerys: copyGallerys });
  };

  const addGallery = () => {
    setData({
      ...data,
      Gallerys: [
        ...data.Gallerys,
        {
          id: uuidv4(),
          title: "Short word for the new gallery",
          description: "pigiee",
          imageSrc:
            "https://meline.imgix.net/meline/IMG_3689.JPG?s=1cd55f58675693f24f152a2012802770",

          url: "https://meline-kosakian.netlify.app/",
        },
      ],
    });
  };

  const deleteGallery = (id) => {
    const copyGallerys = data.Gallerys;
    copyGallerys = copyGallerys.filter((Gallery) => Gallery.id !== id);
    setData({ ...data, Gallerys: copyGallerys });
  };

  const deleteExperiences = (id) => {
    const copyWordsFromChangrui = data.WordsFromChangrui;
    const copyExperiences = data.WordsFromChangrui.experiences;
    copyWordsFromChangrui.experiences = copyExperiences.filter((experiences) => experiences.id !== id);
    setData({ ...data, WordsFromChangrui: copyWordsFromChangrui });
  };

  // Services Handler

  const editServices = (serviceIndex, editService) => {
    let copyServices = data.services;
    copyServices[serviceIndex] = { ...editService };
    setData({ ...data, services: copyServices });
  };

  const addService = () => {
    setData({
      ...data,
      services: [
        ...data.services,
        {
          id: uuidv4(),
          title: "New Service",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
      ],
    });
  };

  const deleteService = (id) => {
    const copyServices = data.services;
    copyServices = copyServices.filter((service) => service.id !== id);
    setData({ ...data, services: copyServices });
  };

  // Socials Handler

  const editSocials = (socialIndex, editSocial) => {
    let copySocials = data.socials;
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const addSocials = () => {
    setData({
      ...data,
      socials: [
        ...data.socials,
        {
          id: uuidv4(),
          title: "New Link",
          link: "www.chetanverma.com",
        },
      ],
    });
  };

  const deleteSocials = (id) => {
    const copySocials = data.socials;
    copySocials = copySocials.filter((social) => social.id !== id);
    setData({ ...data, socials: copySocials });
  };

  // WordsFromChangrui

  const handleAddExperiences = () => {
    setData({
      ...data,
      WordsFromChangrui: {
        ...data.WordsFromChangrui,
        experiences: [
          ...data.WordsFromChangrui.experiences,
          {
            id: uuidv4(),
            dates: String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + '/' + today.getFullYear(),
            words: "1+2",
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    let copyExperiences = data.WordsFromChangrui.experiences;
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      WordsFromChangrui: { ...data.WordsFromChangrui, experiences: copyExperiences },
    });
  };

  return (
    <div className={`container mx-auto ${data.showCursor && "cursor-none"}`}>
      <Header isBlog></Header>
      {data.showCursor && <Cursor />}
      <div className="mt-10">
        <div className={`${theme === "dark" ? "bg-transparent" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Dashboard</h1>
            <div className="flex items-center">
              <Button onClick={saveData} type="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={() => setCurrentTabs("HEADER")}
              type={currentTabs === "HEADER" && "primary"}
            >
              Header
            </Button>
            <Button
              onClick={() => setCurrentTabs("GalleryS")}
              type={currentTabs === "GalleryS" && "primary"}
            >
              Gallery
            </Button>
            <Button
              onClick={() => setCurrentTabs("WordsFromChangrui")}
              type={currentTabs === "WordsFromChangrui" && "primary"}
            >
              WordsFromChangrui
            </Button>


          </div>
        </div>
        {/* HEADER */}
        {currentTabs === "HEADER" && (
          <div className="mt-10">
            <div className="flex items-center">
              <label className="w-1/5 text-lg opacity-50">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">
                Header Tagline One
              </label>
              <input
                value={data.headerTaglineOne}
                onChange={(e) =>
                  setData({ ...data, headerTaglineOne: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Two
              </label>
              <input
                value={data.headerTaglineTwo}
                onChange={(e) =>
                  setData({ ...data, headerTaglineTwo: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Three
              </label>
              <input
                value={data.headerTaglineThree}
                onChange={(e) =>
                  setData({ ...data, headerTaglineThree: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Four
              </label>
              <input
                value={data.headerTaglineFour}
                onChange={(e) =>
                  setData({ ...data, headerTaglineFour: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            {/* 
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Blog</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showBlog: true })}
                  type={data.showBlog && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showBlog: false })}
                  classes={
                    !data.showBlog && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
              
            </div>
            
            
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Dark Mode</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, darkMode: true })}
                  type={data.darkMode && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, darkMode: false })}
                  classes={
                    !data.darkMode && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
            
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Show WordsFromChangrui</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showWordsFromChangrui: true })}
                  type={data.showWordsFromChangrui && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showWordsFromChangrui: false })}
                  classes={
                    !data.showWordsFromChangrui && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Custom Cursor</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showCursor: true })}
                  type={data.showCursor && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showCursor: false })}
                  classes={
                    !data.showCursor && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
          */}
          </div>
        )}
        {/* GalleryS */}
        {currentTabs === "GalleryS" && (
          <>
            <div className="mt-10">
              {data.Gallerys.map((Gallery, index) => (
                <div className="mt-10" key={Gallery.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{Gallery.title}</h1>
                    <Button
                      onClick={() => deleteGallery(Gallery.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Short</label>
                    <input
                      value={Gallery.title}
                      onChange={(e) =>
                        editGallerys(index, {
                          ...Gallery,
                          title: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Description
                    </label>
                    <input
                      value={Gallery.description}
                      onChange={(e) =>
                        editGallerys(index, {
                          ...Gallery,
                          description: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Image Source
                    </label>
                    <input
                      value={Gallery.imageSrc}
                      onChange={(e) =>
                        editGallerys(index, {
                          ...Gallery,
                          imageSrc: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">url</label>
                    <input
                      value={Gallery.url}
                      onChange={(e) =>
                        editGallerys(index, {
                          ...Gallery,
                          url: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <hr className="my-10"></hr>
                </div>
              ))}
            </div>

            <div className="my-10">
              <Button onClick={addGallery} type="primary">
                Add Gallery +
              </Button>
            </div>
          </>
        )}
        {currentTabs === "WordsFromChangrui" && (
          <div className="mt-10">
            <h1>Main</h1>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">ShortWords</label>
              <input
                value={data.WordsFromChangrui.ShortWords}
                onChange={(e) =>
                  setData({
                    ...data,
                    WordsFromChangrui: { ...data.WordsFromChangrui, ShortWords: e.target.value },
                  })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>

            <hr className="my-10"></hr>

            <h1>Words From Changrui</h1>
            <div className="mt-10">
              {data.WordsFromChangrui.experiences.map((experiences, index) => (
                <div className="mt-5" key={experiences.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{experiences.position}</h1>
                    <Button
                      onClick={() => deleteExperiences(experiences.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Dates</label>
                    <input
                      value={experiences.dates}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          dates: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="mt-2 flex">
                    <label className="w-1/5 text-lg opacity-50">Words</label>
                    <div className="w-4/5 ml-10 flex flex-col">
                      <input
                        value={experiences.words}
                        onChange={(e) =>
                          handleEditExperiences(index, {
                            ...experiences,
                            words: e.target.value,
                          })
                        }
                        placeholder="words from Caagrui"
                        className="p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-10">
              <Button onClick={handleAddExperiences} type="primary">
                Add Words +
              </Button>
            </div>

            <hr className="my-10"></hr>

          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
