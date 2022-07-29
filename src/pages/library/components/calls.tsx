/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchCallsByPayloadRequest } from '../../../store/call/actions';
import ReactDataTable from '../../../components/dataTable';
import moment from 'moment';
import Filter from './filter';
import { openModal } from '../../../store/app/actions';
import { ThemeContext } from '../../../themeProvider';

interface IProps {
  saleRepId?: string;
  teams: Array<any>;
}

export default function Calls(props: IProps) {
  const { saleRepId, teams } = props;
  const dispatch = useDispatch();
  const [selectedTeamId, setSelectedTeamId] = useState('all');
  const callList = useSelector((state: RootState) => state.call.callList);
  const [tableData, setTableData] = useState(callList);

  const { theme } = useContext(ThemeContext);

  //Two methods below returns a call s with full info and then returns just meetings list, that have unique meeting_id
  const callsWithFullInfo = callList.filter((value: any) => {
    // return value.client != null && value.ended_at != null;
    //TODO uncomment line above for production
    return value.ended_at != null;
  });

  const meetings = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...new Map(callsWithFullInfo.map((item: any) => [item['meeting_id'], item])).values(),
  ];

  const columns = [
    {
      name: 'Date',
      selector: (row: any) => row.started_at,
      format: (row: any) => {
        const started_at = moment(row.started_at);
        const ended_at = moment(row.ended_at);
        let returnEle: string = started_at.isValid() ? started_at.format('lll') : '';
        if (ended_at.isValid()) {
          returnEle += ` ~ ${ended_at.format('lll')}`;
        }
        return returnEle;
      },
      sortable: true,
    },
    {
      name: 'Meeting',
      selector: (row: { meeting: { title: any } }) => row.meeting.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: { meeting: { description: any } }) => row.meeting.description,
      sortable: true,
    },

    {
      name: 'Caller ID',
      selector: (row: { user: { username: string } }) => row.user.username,
      sortable: true,
    },
    {
      name: 'Client',
      selector: (row: { client: string }) => row.client,
      sortable: true,
    },
  ];

  //TODO refactor here - fetch all data in app initializer
  useEffect(() => {
    setTableData(meetings);
    if (saleRepId) dispatch(fetchCallsByPayloadRequest({}));
    else dispatch(fetchCallsByPayloadRequest({ teamId: selectedTeamId }));
  }, []);

  const handleSelectMembersByTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleOpenModal = (row: any) => {
    dispatch(
      openModal({
        modal: 'RECORDINGS_MODAL',
        params: { row },
      }),
    );
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
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="teams-wrapper">
          <div className="row teams-list-wrapper">
            <div className="col-12">
              <div className="row filter-by">
                <div className="icon-wrapper mb-3"></div>
                <Filter
                  options={_selectOptions(teams)}
                  selectedValue={selectValue(teams, selectedTeamId)}
                  handleChange={(e: any) => {
                    handleSelectMembersByTeam(e.value);
                  }}
                />
              </div>
            </div>
            <ReactDataTable
              theme={theme}
              columnDefs={saleRepId ? columns.filter((e) => e.name !== 'Caller ID') : columns}
              rowData={tableData}
              expandableRows={tableData !== callList}
              openRecordings={handleOpenModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
