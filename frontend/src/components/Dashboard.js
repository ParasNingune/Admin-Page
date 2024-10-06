import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  color,
} from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
  // State variables
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    duration: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch all songs
  const fetchSongs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/songs', {
        headers: { Authorization: token },
      });
      setSongs(response.data);
    } catch (err) {
      toast({
        title: 'Error fetching songs',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Function to handle opening the modal for adding a song
  const handleAddClick = () => {
    setIsEditing(false);
    setSelectedSong(null);
    setFormData({ name: '', artist: '', duration: '' });
    onOpen();
  };

  // Function to handle opening the modal for editing a song
  const handleEditClick = (song) => {
    setIsEditing(true);
    setSelectedSong(song);
    setFormData({
      name: song.name,
      artist: song.artist,
      duration: song.duration,
    });
    onOpen();
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to add a new song
  const addSong = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/songs',
        {
          title: formData.name,
          artist: formData.artist,
          duration: formData.duration,
        },
        {
            headers: { Authorization: token },
        }
      );
      toast({
        title: 'Song Added',
        description: `Successfully added "${formData.name}" by ${formData.artist}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      fetchSongs();
      onClose();
    } catch (err) {
      toast({
        title: 'Error adding song',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Function to update an existing song
  const updateSong = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/songs/${selectedSong._id}`,
        {
          name: formData.name,
          artist: formData.artist,
          duration: formData.duration,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast({
        title: 'Song Updated',
        description: `Successfully updated "${formData.name}" by ${formData.artist}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      fetchSongs();
      onClose();
    } catch (err) {
      toast({
        title: 'Error updating song',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Function to delete a song
  const deleteSong = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/songs/${id}`, {
        headers: { Authorization: token },
      });
      toast({
        title: 'Song Deleted',
        description: 'The song has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      fetchSongs();
    } catch (err) {
      toast({
        title: 'Error deleting song',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Fetch songs on component mount
  useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-b, blue.500, blue.100)"
      p={8}
    >
      {/* Overlay Box to provide a semi-transparent background for content */}
      <Box
        maxW="1200px"
        mx="auto"
        bg="whiteAlpha.800"
        borderRadius="md"
        boxShadow="lg"
        p={6}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={8}>
          <Box fontWeight="800" fontSize="6xl">
            Music Dashboard
          </Box>
          <Button alignSelf={'center'} colorScheme="green" onClick={handleAddClick}>
            Add Song
          </Button>
        </Box>

        {/* Songs Table */}
        <Table variant="simple" colorScheme="blue">
          <Thead>
            <Tr>
              <Th backgroundColor={'black'} color={'white'} fontSize={24}>Song Name</Th>
              <Th backgroundColor={'black'} color={'white'} fontSize={24}>Artist</Th>
              <Th backgroundColor={'black'} color={'white'} fontSize={24}>Duration</Th>
              <Th backgroundColor={'black'} color={'white'} fontSize={24}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song) => (
              <Tr
                key={song._id}
                _hover={{ bg: 'blue.100', cursor: 'pointer' }}
              >
                <Td>{song.title}</Td>
                <Td>{song.artist}</Td>
                <Td>{song.duration}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditClick(song)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteSong(song._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Add/Edit Song Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEditing ? 'Edit Song' : 'Add Song'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Song Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter song name"
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Artist</FormLabel>
                <Input
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Duration</FormLabel>
                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 3:30"
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={isEditing ? updateSong : addSong}
              >
                {isEditing ? 'Update' : 'Save'}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Dashboard;







// import React, { useState, useEffect } from 'react';
// import Songs from './Songs';
// import AddSong from './AddSong';
// import axios from 'axios';

// const Dashboard = () => {
//     const [songs, setSongs] = useState([]);

//     // Fetch all songs for the user
//     const fetchSongs = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const res = await axios.get('http://localhost:5000/songs', {
//                 headers: { Authorization: token }
//             });
//             setSongs(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     // Fetch songs when component loads
//     useEffect(() => {
//         fetchSongs();
//     }, []);

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <AddSong refreshSongs={fetchSongs} /> {/* Pass fetchSongs as a prop */}
//             <Songs songs={songs} /> {/* Pass the songs array as a prop */}
//         </div>
//     );
// };

// export default Dashboard;


// src/Dashboard.js