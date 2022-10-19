import React from "react";

const ProjectResume = ({ dates, words }) => {
  const [bulletsLocal, setBulletsLocal] = React.useState(words.split(","));

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
      <div className="text-lg w-2/5">
        <h2>{dates}</h2>
        {bulletsLocal && bulletsLocal.length > 0 && (
          <ul className="list-disc">
            {bulletsLocal.map((words, index) => (
              <li key={index} className="text-sm my-1 opacity-70">
                {words}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;
