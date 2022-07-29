/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TeamPreview from './teamPreview';

type props = {
  handleSelectMembersByTeam: any;
};

export default function Teams({ handleSelectMembersByTeam }: props) {
  const currentUser: any = useSelector((state: any) => state.app.currentUser);
  const resTeams: any = useSelector((state: any) => state.teams); // get sale_rep users

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (resTeams.teamList) {
      setTeams(resTeams.teamList);
    }
  }, [resTeams.teamList]);

  return (
    <>
      {teams?.map((item: any) => (
        <div className="col-lg-2 col-md-4 col-sm-12" key={item.id}>
          <TeamPreview
            item={item}
            userId={currentUser?.id}
            handleSelectMembersByTeam={handleSelectMembersByTeam}
          />
        </div>
      ))}
    </>
  );
}
