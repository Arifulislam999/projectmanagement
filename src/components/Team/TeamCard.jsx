import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamModal,
  setCardModal,
  setModalData
} from "../../features/modal/modalSlice";
import { getTeam } from "../../features/teams/teamSlice";
import CardModal from "../CardModal";
import AddUserModal from "../Team/AddUserModal";

const colors = {
  purple: `text-purple-500 bg-purple-100`,
  red: `text-red-500 bg-red-100`,
  indigo: `text-indigo-500 bg-indigo-100`,
  orange: `text-orange-500 bg-orange-100`,
  amber: `text-amber-500 bg-amber-100`,
  green: `text-green-500 bg-green-100`,
  lime: `text-lime-500 bg-lime-100`,
};

export default function TeamCard({ team, onClick, open, setOpen }) {
  const { name, description, date, color } = team ?? {};

  const { cardModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const generatedColor = colors[color];

  return (
    <>
      <div
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        {open && (
          <CardModal
            handleFirst={() => {
              setOpen(false);
              dispatch(setCardModal());
              dispatch(getTeam(team));
            }}
            handleSecond={() => {
              dispatch(addTeamModal(true));
              dispatch(setModalData(team));
              setOpen(false);
            }}
            firstTitle="Add User"
            secondTitle="Edit Team"
          />
        )}
        <button
          onClick={onClick}
          className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold ${generatedColor} rounded-full`}
        >
          {name}
        </span>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">{date}</span>
          </div>
        </div>
      </div>
      {cardModal && <AddUserModal />}
    </>
  );
}
