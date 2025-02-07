import { X } from "lucide-react";
import { useRef, useState } from "react";

export default function TeamForm({ onCloseTeam, onAddTeam }) {
  const modelRef = useRef();
  const [name, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);

  const onCloseTeamForm = (e) => {
    if (modelRef.current === e.target) {
      onCloseTeam();
    }
  };
  const handleMemberName = (index , e) => {
    console.log(e);
    if (!e.target) return;
    const updatedMembers = [...members];
        updatedMembers[index] = e.target.value;
        setMembers(updatedMembers);
  };
  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    console.log(members);
    try {
      const response = await fetch(
        "https://workasana-backend-kappa.vercel.app/teams",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ name, members }),
        }
      );
      const data = await response.json();
      if(data){ 
        setMembers("","","")
        setTeamName("")
        onAddTeam(data)
        onCloseTeam()
      }
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={onCloseTeamForm}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-content-center align-items-center"
    >
      <form
        className="bg-light py-5 px-5 "
        style={{ width: "30%" }}
        onSubmit={handleSubmitBtn}
      >
        <button onClick={onCloseTeam} className="float-end">
          <X />
        </button>
        <h3>Create New Team </h3>
        <label>Team Name: </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTeamName(e.target.value)}
          value={name}
        />
        <br />
        <label>Add members</label>
        {members.map((member, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-control"
                        placeholder="Member name"
                        value={member}
                        onChange={(e) => handleMemberName(index, e)} 
                    />
                ))}

        <div className="float-end py-3">
          <button className="btn btn-secondary mx-1" onClick={onCloseTeam}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mx-1">Create</button>
        </div>
      </form>
    </div>
  );
}
