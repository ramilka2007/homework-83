import React from 'react';
import {NavLink} from 'react-router-dom';
import {API_URL} from '../../constants';
import NoArtistImage from '../../assets/artist-none-image.png';
import {CardMedia, styled} from '@mui/material';
import {Artist} from '../../types';

const ImageCardMedia = styled(CardMedia)({
    width: '100px',
    height: "100px",
    margin: "20px",
    borderRadius: "50%"
});

interface Props {
    artist: Artist;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
    return (
        <div className="col">
            <NavLink to={`albums?artist=${artist._id}`} className="d-block border mb-2 rounded-4 text-black text-decoration-none">
                <div className="d-flex justify-content-between align-items-center">
                    <ImageCardMedia
                        image={artist.image ? API_URL + artist.image : NoArtistImage} title={artist._id}/>
                    <h5 className="w-50">{artist.artist}</h5>
                </div>
            </NavLink>
        </div>
    );
};

export default ArtistCard;