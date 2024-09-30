import React from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../constants';
import NoArtistImage from '../../assets/no-image.png';
import { CardMedia, styled } from '@mui/material';
import { Artist } from '../../types';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/users/usersSlice";

const ImageCardMedia = styled(CardMedia)({
  width: '100px',
  height: '100px',
  margin: '20px',
  borderRadius: '50%',
});

interface Props {
  artist: Artist;
  artistDelete: (id: string) => void;
  artistPublish: (id: string) => void;
}

const ArtistCard: React.FC<Props> = ({ artist, artistDelete, artistPublish }) => {
  const user = useAppSelector(selectUser);
  return (
    <div className="col d-block border mb-2 pb-3 rounded-4 text-black text-decoration-none">
      {!artist.isPublished ? <h5>Unpublished</h5> : null}
      <NavLink
          to={artist.isPublished ? `/albums?artist=${artist._id}` : ''}
          className="text-black text-decoration-none"
      >
        <div className="d-flex justify-content-between align-items-center">
          <ImageCardMedia
              image={artist.image ? API_URL + '/' + artist.image : NoArtistImage}
              title={artist._id}
          />
          <h5 className="w-50">{artist.name}</h5>
        </div>
      </NavLink>
      {user ? <>
        {user._id === artist.user || user.role === 'admin' ? <button className="btn btn-danger me-2" onClick={() => artistDelete(artist._id)}>Delete</button> : null}
        {user.role === 'admin' ? <button className="btn btn-primary" onClick={() => artistPublish(artist._id)}>{artist.isPublished ? <>Unpublish</> : <>Publish</>}</button> : null}</> : null}
    </div>
  );
};

export default ArtistCard;
