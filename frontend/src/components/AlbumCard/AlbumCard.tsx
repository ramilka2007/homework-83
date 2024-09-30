import React from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../constants';
import { CardMedia, styled } from '@mui/material';
import { Album } from '../../types';
import NoAlbumImage from '../../assets/no-image.png';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/users/usersSlice";

const ImageCardMedia = styled(CardMedia)({
  width: '100px',
  height: '100px',
  margin: '20px',
  borderRadius: '50%',
});

interface Props {
  album: Album;
  albumDelete: (id: string) => void;
  albumPublish: (id: string) => void;
}

const AlbumCard: React.FC<Props> = ({ album, albumDelete, albumPublish }) => {
  const user = useAppSelector(selectUser);
  return (
    <div className="col d-block border mb-2 rounded-4">
      <NavLink
        to={album.isPublished ? `/tracks?album=${album._id}&artist=${album.artist._id}` : ''}
        className="text-black text-decoration-none"
      >
        <div className="d-flex align-items-center">
          <ImageCardMedia
            image={album.image ? API_URL + '/' + album.image : NoAlbumImage}
            title={album._id}
          />
          <div className="text-start">
            <h5>{album.title}</h5>
            <p className="opacity-50">Release: {album.release}</p>
          </div>
        </div>
      </NavLink>
      {user ? <>
        {user._id === album.user || user.role === 'admin' ? <button className="btn btn-danger me-2" onClick={() => albumDelete(album._id)}>Delete</button> : null}
        {user.role === 'admin' ? <button className="btn btn-primary" onClick={() => albumPublish(album._id)}>{album.isPublished ? <>Unpublish</> : <>Publish</>}</button> : null}</> : null}
    </div>
  );
};

export default AlbumCard;
