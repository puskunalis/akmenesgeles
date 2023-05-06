import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
      }
    }
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
  
      if (!selectedFile) {
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const data = await axios.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponse(data);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }