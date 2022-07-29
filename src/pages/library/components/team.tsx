import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalesRepPreview from '../../team/components/salesRepPreview';
import { RootState } from '../../../store';
import { fetchSalesRepsByPayloadRequest } from '../../../store/salesRep/actions';
import { openModal } from '../../../store/app/actions';
import Teams from './teams';
import Filter from './filter';
import { Team as ITeam } from '../../../types/team';
import { User } from '../../../types/user';

interface IProps {
  teams: Array<ITeam>;
}

export default function Team(props: IProps) {
  const { teams } = props;
  const dispatch = useDispatch();
  const salesReps = useSelector((state: RootState) => state.salesRep.salesRepList);
  const currentUser: User | null = useSelector((state: RootState) => state.app.currentUser);
  const [selectedTeamId, setSelectedTeamId] = useState('all');
  const [isShowTeams, setShowTeams] = useState(false);

  // useEffect(() => {
  //   if (teams && teams.length > 0) setSelectedTeamId(teams[0].id);
  // }, [teams]);

  useEffect(() => {
    if (selectedTeamId === 'all') dispatch(fetchSalesRepsByPayloadRequest({}));
    else dispatch(fetchSalesRepsByPayloadRequest({ teamId: selectedTeamId }));
  }, [selectedTeamId]);

  const handleClickCreate = () => {
    dispatch(
      openModal({
        modal: 'SALES_REP_MODAL',
        params: {
          action: 'add',
          formData: {
            avatar: '',
            username: '',
            email: '',
            teamId: selectedTeamId,
          },
        },
      }),
    );
  };

  const handleClickTeams = () => {
    setShowTeams(true);
  };

  const handleClickCreateTeam = () => {
    dispatch(
      openModal({
        modal: 'TEAM_MODAL',
        params: {
          action: 'add',
          userId: currentUser?.id,
          formData: {
            avatar: '',
            name: '',
          },
        },
      }),
    );
  };

  const handleSelectMembersByTeam = (teamId: string) => {
    setShowTeams(false);
    setSelectedTeamId(teamId);
  };

  const handleSelectSaleRepCalls = (saleRepId: string) => {
    console.log(saleRepId);
  };

  const selectValue = (teams: Array<any>, selectedTeamId: string | null) => {
    const selectedTeam = teams.find((r) => r.id === selectedTeamId);
    if (selectedTeam && selectedTeam !== 'all') {
      return { label: selectedTeam.name, value: selectedTeam.id };
    } else {
      return { label: 'All', value: 'all' };
    }
  };

  const _selectOptions = (teams: Array<any>) => {
    let _teams = teams.map((r: { name: string; id: string }) => {
      return { label: r.name, value: r.id };
    });
    _teams = Object.assign([{ label: 'All', value: 'all' }, ..._teams]);
    return _teams;
  };

  return (
    <div className="row tab-wrapper">
      <div className="button-wrapper d-flex justify-content-end">
        <button className="btn btn-primary mx-2" onClick={handleClickTeams}>
          <span className="text-light">Teams</span>
        </button>
        {isShowTeams ? (
          <button className="btn btn-primary mx-2" onClick={handleClickCreateTeam}>
            <span className="text-light">Create Team</span>
          </button>
        ) : (
          <button className="btn btn-primary mx-2" onClick={handleClickCreate}>
            <span className="text-light">Create Sales Rep</span>
          </button>
        )}
      </div>
      <div className="teams-wrapper">
        <div className="row teams-list-wrapper">
          <div className="col-12">
            <div className="row filter-by">
              <Filter
                options={_selectOptions(teams)}
                selectedValue={selectValue(teams, selectedTeamId)}
                handleChange={(e: any) => {
                  handleSelectMembersByTeam(e.value);
                }}
              />
            </div>
          </div>
          {isShowTeams ? (
            <Teams handleSelectMembersByTeam={handleSelectMembersByTeam} />
          ) : (
            salesReps.map((item: any) => (
              <div className="col-lg-2 col-md-4 col-sm-12" key={item.id}>
                <SalesRepPreview
                  item={item}
                  userId={''}
                  handleSelectSaleRepCalls={handleSelectSaleRepCalls}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
