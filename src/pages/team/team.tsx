/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Pagination from 'react-js-pagination';

import UserLayout from '../../components/layout/user';
import SalesRepPreview from './components/salesRepPreview';

import { Notification, NotificationContainer } from '../../hooks/useNotification';
import { fetchCurrentUser, openModal } from '../../store/app/actions';
import { fetchSalesRepFailure, fetchSalesRepsByPayloadRequest } from '../../store/salesRep/actions';
import { UserRole } from '../../utils/userRole';

export default function TeamForSalesReps() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teamId }: any = useParams();
  const currentUser: any = useSelector((state: any) => state.app.currentUser);
  const resSalesRep: any = useSelector((state: any) => state.salesRep); // get sales_rep users

  const [salesReps, setSalesReps] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    function fetchData() {
      const result = dispatch(fetchCurrentUser());
      dispatch(fetchSalesRepsByPayloadRequest({ teamId, userId: result.payload.id }));
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (resSalesRep.SalesRepList) {
      setSalesReps(resSalesRep.SalesRepList);
    }
  }, [resSalesRep.SalesRepList]);

  // Reload teams list from server after CRUD actions
  useEffect(() => {
    function fetchData() {
      if (resSalesRep.data?.success) {
        dispatch(fetchSalesRepsByPayloadRequest({ teamId, userId: currentUser?.id }));
        dispatch(fetchSalesRepFailure(null));
      } else {
        Notification('error', resSalesRep.data?.message);
        dispatch(fetchSalesRepFailure(null));
      }
    }

    fetchData();
  }, [resSalesRep.data]);

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
          },
        },
      }),
    );
  };

  const handleSelectSaleRepCalls = (saleRepId: string) => {
    console.info(saleRepId);
  };

  return (
    <UserLayout>
      <div className="library-page">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {currentUser?.role === UserRole.MANAGER && (
              <div className="teams-wrapper">
                <div className="button-wrapper d-flex justify-content-end">
                  <button className="btn btn-primary mx-2" onClick={handleClickCreate}>
                    <span className="text-light">Create Sales Rep</span>
                  </button>
                  <button className="btn btn-secondary" onClick={() => history.goBack()}>
                    <span className="text-light">Back</span>
                  </button>
                </div>
                <div className="row teams-list-wrapper">
                  {salesReps.map((item: any) => (
                    <div className="col-lg-3 col-md-4 col-sm-12" key={item.id}>
                      <SalesRepPreview
                        item={item}
                        userId={currentUser?.id}
                        handleSelectSaleRepCalls={handleSelectSaleRepCalls}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <NotificationContainer />
      </div>
    </UserLayout>
  );
}
