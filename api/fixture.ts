import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('track-history');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2] = await User.create(
    {
      username: 'user@shop.local',
      password: '1qaz@WSX',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@shop.local',
      password: '1@345qWert',
      role: 'admin',
      token: crypto.randomUUID(),
    },
  );

  const [Eminem, E50Cent, LanaDelRey] = await Artist.create(
    {
      user: user1,
      name: 'Eminem',
      image: 'fixtures/artist1_pic.jpeg',
      isPublished: true,
    },
    {
      user: user2,
      name: 'E50 Cent',
      image: 'fixtures/artist2_pic.jpeg',
      isPublished: false,
    },
    {
      user: user2,
      name: 'LanaDelRey',
      image: 'fixtures/artist2_pic.jpeg',
      isPublished: true,
    },
  );

  const [
    EminemAlbum1,
    EminemAlbum2,
    E50CentAlbum1,
    E50CentAlbum2,
    LanaDelReyAlbum1,
    LanaDelReyAlbum2,
  ] = await Album.create(
    {
      user: user1,
      title: 'The Marshall Mathers LP',
      artist: Eminem._id,
      release: 2000,
      image: 'fixtures/artist1_album1_pic.jpeg',
      isPublished: true,
    },
    {
      user: user1,
      title: 'Recovery',
      artist: Eminem._id,
      release: 2010,
      image: 'fixtures/artist1_album2_pic.jpeg',
      isPublished: true,
    },
    {
      user: user2,
      title: 'Get Rich or Die Tryin',
      artist: E50Cent._id,
      release: 2003,
      image: 'fixtures/artist2_album1_pic.jpeg',
      isPublished: false,
    },
    {
      user: user2,
      title: 'The Massacre',
      artist: E50Cent._id,
      release: 2005,
      image: 'fixtures/artist2_album2_pic.jpeg',
      isPublished: true,
    },
    {
      user: user1,
      title: 'Get Rich or Die Tryin',
      artist: LanaDelRey._id,
      release: 2003,
      image: 'fixtures/artist2_album1_pic.jpeg',
      isPublished: true,
    },
    {
      user: user2,
      title: 'The Massacre',
      artist: LanaDelRey._id,
      release: 2005,
      image: 'fixtures/artist2_album2_pic.jpeg',
      isPublished: false,
    },
  );

  await Track.create(
    {
      user: user1,
      title: 'Stan',
      album: EminemAlbum1._id,
      duration: '6:44',
      number: 1,
      isPublished: true,
    },
    {
      user: user1,
      title: 'The Real Slim Shady',
      album: EminemAlbum1._id,
      duration: '4:44',
      number: 2,
      isPublished: false,
    },
    {
      user: user1,
      title: 'The Way I Am',
      album: EminemAlbum1._id,
      duration: '4:51',
      number: 3,
      isPublished: true,
    },
    {
      user: user1,
      title: 'Kill You',
      album: EminemAlbum1._id,
      duration: '4:36',
      number: 4,
      isPublished: false,
    },
    {
      user: user1,
      title: 'Criminal',
      album: EminemAlbum1._id,
      duration: '4:55',
      number: 5,
      isPublished: true,
    },

    {
      user: user2,
      title: 'Not Afraid',
      album: EminemAlbum2._id,
      duration: '4:04',
      number: 1,
      isPublished: true,
    },
    {
      user: user1,
      title: 'Love the Way You Lie',
      album: EminemAlbum2._id,
      duration: '3:44',
      number: 2,
      isPublished: false,
    },
    {
      user: user1,
      title: 'No Love',
      album: EminemAlbum2._id,
      duration: '3:51',
      number: 3,
      isPublished: true,
    },
    {
      user: user2,
      title: 'Space Bound',
      album: EminemAlbum2._id,
      duration: '4:55',
      number: 4,
      isPublished: false,
    },
    {
      user: user2,
      title: 'Cinderella Man',
      album: EminemAlbum2._id,
      duration: '2:55',
      number: 5,
      isPublished: true,
    },

    {
      user: user2,
      title: 'What Up Gangsta',
      album: E50CentAlbum1._id,
      duration: '2:59',
      number: 1,
      isPublished: true,
    },
    {
      user: user2,
      title: 'In Da Club',
      album: E50CentAlbum1._id,
      duration: '3:13',
      number: 2,
      isPublished: true,
    },
    {
      user: user2,
      title: 'Many Men (Wish Death)',
      album: E50CentAlbum1._id,
      duration: '4:17',
      number: 3,
      isPublished: true,
    },
    {
      user: user2,
      title: 'Patiently Waiting (feat. Eminem)',
      album: E50CentAlbum1._id,
      duration: '4:48',
      number: 4,
      isPublished: true,
    },
    {
      user: user2,
      title: '21 Questions (feat. Nate Dogg)',
      album: E50CentAlbum1._id,
      duration: '3:44',
      number: 5,
      isPublished: true,
    },

    {
      user: user1,
      title: 'Intro',
      album: E50CentAlbum2._id,
      duration: '0:41',
      number: 1,
      isPublished: true,
    },
    {
      user: user1,
      title: 'In My Hood',
      album: E50CentAlbum2._id,
      duration: '3:51',
      number: 2,
      isPublished: false,
    },
    {
      user: user1,
      title: 'This Is 50',
      album: E50CentAlbum2._id,
      duration: '3:04',
      number: 3,
      isPublished: false,
    },
    {
      user: user1,
      title: "I'm Supposed to Die Tonight",
      album: E50CentAlbum2._id,
      duration: '3:51',
      number: 4,
      isPublished: false,
    },
    {
      user: user1,
      title: 'Piggy Bank',
      album: E50CentAlbum2._id,
      duration: '4:15',
      number: 5,
      isPublished: false,
    },

    {
      user: user2,
      title: 'What Up Gangsta',
      album: LanaDelReyAlbum1._id,
      duration: '2:59',
      number: 1,
      isPublished: true,
    },
    {
      user: user2,
      title: 'In Da Club',
      album: LanaDelReyAlbum1._id,
      duration: '3:13',
      number: 2,
    },
    {
      user: user2,
      title: 'Many Men (Wish Death)',
      album: LanaDelReyAlbum1._id,
      duration: '4:17',
      number: 3,
      isPublished: true,
    },
    {
      user: user1,
      title: 'Patiently Waiting (feat. Eminem)',
      album: LanaDelReyAlbum1._id,
      duration: '4:48',
      number: 4,
      isPublished: true,
    },
    {
      user: user2,
      title: '21 Questions (feat. Nate Dogg)',
      album: LanaDelReyAlbum1._id,
      duration: '3:44',
      number: 5,
      isPublished: true,
    },

    {
      user: user1,
      title: 'Intro',
      album: LanaDelReyAlbum2._id,
      duration: '0:41',
      number: 1,
      isPublished: false,
    },
    {
      user: user2,
      title: 'In My Hood',
      album: LanaDelReyAlbum2._id,
      duration: '3:51',
      number: 2,
      isPublished: false,
    },
    {
      user: user1,
      title: 'This Is 50',
      album: LanaDelReyAlbum2._id,
      duration: '3:04',
      number: 3,
      isPublished: false,
    },
    {
      user: user2,
      title: "I'm Supposed to Die Tonight",
      album: LanaDelReyAlbum2._id,
      duration: '3:51',
      number: 4,
      isPublished: false,
    },
    {
      user: user1,
      title: 'Piggy Bank',
      album: LanaDelReyAlbum2._id,
      duration: '4:15',
      number: 5,
      isPublished: false,
    },
  );

  await db.close();
};

run().catch(console.error);
