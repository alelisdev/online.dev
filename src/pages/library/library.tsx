/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLayout from '../../components/layout/user';
import { RootState } from '../../store';
import { fetchCurrentUser } from '../../store/app/actions';
import { fetchTeamsByPayloadRequest } from '../../store/teams/actions';
import { UserRole } from '../../utils/userRole';
import Team from './components/team';
import Calls from './components/calls';

const tabs = [
  { tab: 'calls', title: 'All Calls' },
  { tab: 'teams', title: 'All Team' },
];

export default function Library() {
  const dispatch = useDispatch();
  const resTeams: any = useSelector((state: RootState) => state.teams);
  const currentUser: any = useSelector((state: RootState) => state.app.currentUser);
  const [selectedTab, setSelectedTab] = useState('calls');

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === UserRole.MANAGER)
      dispatch(fetchTeamsByPayloadRequest({ userId: currentUser.id }));
  }, [currentUser]);

  const handleClickTab = (e: any, tab: string) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  return (
    <UserLayout>
      <div className="library-page">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {currentUser && currentUser.role === UserRole.MANAGER && (
              <ul className="nav nav-pills">
                {tabs.map((tab) => (
                  <li key={tab.tab} className="nav-item">
                    <a
                      className={`nav-link ${selectedTab === tab.tab && 'active'}`}
                      aria-current="page"
                      href={tab.tab}
                      onClick={(e) => handleClickTab(e, tab.tab)}
                    >
                      {tab.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {currentUser && currentUser.role === UserRole.SALE_REP && <h3>Analytics</h3>}
          </div>
        </div>
        {currentUser ? (
          <Calls
            saleRepId={currentUser.role === UserRole.SALE_REP ? currentUser.id : null}
            teams={resTeams.teamList}
          />
        ) : (
          <Team teams={resTeams.teamList} />
        )}
      </div>
    </UserLayout>
  );
}
