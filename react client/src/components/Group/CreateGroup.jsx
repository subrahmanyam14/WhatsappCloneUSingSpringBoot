import React, { useEffect, useState } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsCheck2,
  BsFilter,
  BsPencil,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, updateUser } from "../../Redux/Auth/Action";
import { AiOutlineSearch } from "react-icons/ai";
import UserChat from "../HomePage/UserChat";
import SelectedMember from "./SelectedMember";
import NewGroup from "./NewGroup";

const CreateGroup = ({ handleBack,setIsGoup }) => {
  const { auth, chat } = useSelector((store) => store);

  const [groupMember, setGroupMember] = useState(new Set());

  const dispatch = useDispatch();

  const [querys, setQuerys] = useState("");

  const token = localStorage.getItem("token");

  const [newGroup, setNewGroup] = useState(false);

  const handleSearch = (keyword) => {
    dispatch(searchUser({ userId: auth.reqUser?.id, keyword, token }));
  };
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };
  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
            <BsArrowLeft
              onClick={handleBack}
              className="cursor-pointer text-2xl font-bold"
            />
            <p className="text-xl font-semibold">Add Group Participats</p>
          </div>

          <div className="relative  bg-white py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                  />
                ))}
            </div>

            <input
              onChange={(e) => {
                setQuerys(e.target.value);
                handleSearch(e.target.value);
              }}
              className="outline-none border-b border-[#888888] px-2  py-2 w-[93%]"
              type="text"
              placeholder="Search or start new Chat"
              value={querys}
            />
          </div>

          <div className="bg-white overflow-y-scroll h-[50.2vh]">
            {querys &&
              auth.searchUser?.map((item, index) => (
                <div
                  onClick={() => {
                    groupMember.add(item);
                    setGroupMember(groupMember);
                    setQuerys("");
                  }}
                  key={item?.id}
                >
                  <hr />
                  <UserChat
                    isChat={false}
                    name={item.full_name}
                    userImg={
                      item.profile_picture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                  />
                </div>
              ))}
          </div>

          <div className="bottom-10 py-10 bg-slate-200 flex items-center justify-center">
            <div
              onClick={() => {
                setNewGroup(true);
              }}
              className="bg-green-600 rounded-full p-4 cursor-pointer"
            >
              <BsArrowRight className="text-white font-bold text-3xl" />
            </div>
          </div>
        </div>
      )}

      {newGroup && (
        <div>
          <NewGroup groupMember={groupMember} setIsCreateGroup={setIsGoup}/>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
