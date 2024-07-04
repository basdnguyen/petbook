import { Box, Button, TextField } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../AppContext";

interface Props {
  onPostCreated: () => void;
}

export const PostCreate = ({ onPostCreated }: Props) => {
  const { jwt } = useContext(AppContext);

  const [imagePublicId, setImagePublicId] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState('');

  function onSuccess(result: any, widget: any) {
    widget.close({
      quiet: true,
    });
    setImagePublicId(result.info?.public_id);
    setMessage('');
  }

  async function deleteUploadImage() {
    setImagePublicId('');
  }

  function onChangeMessage(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  async function doPost() {
    setIsPosting(true);
    await axios.post('/api/posts', {
      content: message,
      image_url: imagePublicId
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    setImagePublicId('');
    setIsPosting(false);
    onPostCreated();
  }

  return (
    <Box maxWidth='sm' sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 1,
      gap: 1,
    }}>
      {!imagePublicId && (
        <CldUploadWidget uploadPreset="default" onSuccess={onSuccess}>
          {({ open }) => {
            return (
              <Button onClick={() => open()}>
                Share a moment of your pet
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
      {imagePublicId && (
        <>
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <CldImage
              width="960"
              height="600"
              src={imagePublicId}
              sizes="100vw"
              alt="Description of my image"
            />
            <Button variant="contained" aria-label='Remove Image' color='info'
              sx={{ position: 'absolute', top: 4, right: 4, padding: '4px', minWidth: 32 }}
              onClick={deleteUploadImage}
            >
              <Delete />
            </Button>
            <TextField
              multiline
              id="message"
              placeholder="Say something about the image"
              value={message}
              onChange={onChangeMessage}
              sx={{ flexGrow: 1, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
            />
          </Box>
          <Button variant="contained" color='primary' onClick={doPost} disabled={isPosting}>Post</Button>
        </>
      )}
    </Box>
  )
}