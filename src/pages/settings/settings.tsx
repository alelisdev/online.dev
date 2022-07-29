/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.scss';
import UserLayout from '../../components/layout/user';
import ReactSelect from '../../components/select/reactSelect';
import { updateUserRequest, uploadUserImageRequest } from '../../store/user/actions';
import { fetchCurrentUser } from '../../store/app/actions';
import { IUserImageRequest } from '../../types/user';
import { ThemeContext } from '../../themeProvider';
import Switch from '../../components/switch';

const options1 = [{ label: 'option1', value: 'option1' }];
const options2 = [{ label: 'option2', value: 'option2' }];
const options3 = [{ label: 'option3', value: 'option3' }];

export default function Settings() {
  const history = useHistory();
  const dispatch = useDispatch();
  const resUserImage = useSelector((state: any) => state.user.userImage);

  useEffect(() => {
    async function fetchData() {
      const result = fetchCurrentUser();
      setCurrentUser(result.payload);
      setUserBgImage(result.payload.background);
      setUserAvatar(
        result.payload.avatar
          ? result.payload.avatar
          : '//ssl.gstatic.com/accounts/ui/avatar_2x.png',
      );
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (resUserImage !== '' && uploadedImageType !== '') {
      if (uploadedImageType === 'avatar') setUserAvatar(resUserImage);
      if (uploadedImageType === 'background') setUserBgImage(resUserImage);
    }
  }, [resUserImage]);

  const [currentUser, setCurrentUser] = useState({
    id: '',
    username: '',
    email: '',
    avatar: '',
    background: '',
  });

  const [uploadedImageType, setUploadedImageType] = useState('');
  const [userBgImage, setUserBgImage] = useState('');
  const [userAvatar, setUserAvatar] = useState('//ssl.gstatic.com/accounts/ui/avatar_2x.png');
  const [option1, setOption1] = useState(options1[0]);
  const [option2, setOption2] = useState(options2[0]);
  const [option3, setOption3] = useState(options3[0]);

  const handleUploadImage = (type: string) => (e: any) => {
    try {
      setUploadedImageType(type);
      const imagePure = e.target.files[0];
      const src = URL.createObjectURL(imagePure);

      const formData = new FormData() as IUserImageRequest;
      formData.append('photo', imagePure, imagePure.name);
      formData.append(type, 'true');

      if (type === 'background') {
        setUserBgImage(src);
      } else if (type === 'avatar') {
        setUserAvatar(src);
      }

      dispatch(uploadUserImageRequest(formData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDone = () => {
    const payload = {
      avatar: userAvatar,
      background: userBgImage,
    };
    dispatch(updateUserRequest(currentUser.id, payload));

    history.push('/contacts');
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <UserLayout>
      <div className="setting-page">
        <div className="pb-2">
          <Switch
            label={`${theme} mode`}
            isChecked={theme === 'Light'}
            isInline={true}
            theme={theme}
            onChange={toggleTheme}
          />
        </div>
        <div className="user-profile-wrapper">
          <div className={`user-profile-bg-wrapper ${theme === 'Light' ? 'light-mode' : null}`}>
            {userBgImage && (
              <img
                src={userBgImage}
                className={`user-profile-bg ${theme === 'Light' ? 'light-mode' : null}`}
                alt=""
              />
            )}
          </div>
          <div className="user-profile-bg-edit-button">
            <label htmlFor="file-user-bg">
              <i className="fas fa-pencil-alt"></i>
            </label>
            <input
              type="file"
              id="file-user-bg"
              accept="image/*"
              onChange={handleUploadImage('background')}
              hidden
            />
          </div>
          <div className="user-profile d-flex align-items-center">
            <div className="user-avatar-wrapper">
              <label htmlFor="user-avatar">
                <img src={userAvatar} className="user-avatar" alt="" />
              </label>
              <input
                type="file"
                id="user-avatar"
                accept="image/*"
                onChange={handleUploadImage('avatar')}
                hidden
              />
            </div>
            <div className="user-info">
              <h1 className="username">{currentUser?.username}</h1>
              <h4 className="email">{currentUser?.email}</h4>
            </div>
          </div>
        </div>
        <div className="option-bar row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="option-wrapper form-group">
              <label htmlFor="main-select">Option 1</label>
              <ReactSelect
                options={options1}
                value={option1}
                onChange={(e: any) => setOption1(e.target.value)}
              />
            </div>
            <div className="option-wrapper form-group">
              <label htmlFor="main-select">Option 2</label>
              <ReactSelect
                options={options2}
                value={option2}
                onChange={(e: any) => setOption2(e.target.value)}
              />
            </div>
            <div className="option-wrapper form-group">
              <label htmlFor="main-select">Option 3</label>
              <ReactSelect
                options={options3}
                value={option3}
                onChange={(e: any) => setOption3(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="btn btn-primary btn-lg" onClick={handleClickDone}>
            <span className="text-light fs-6">Done</span>
          </button>
        </div>
      </div>
    </UserLayout>
  );
}
