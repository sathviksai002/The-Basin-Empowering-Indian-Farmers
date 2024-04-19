import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useTranslation } from 'react-i18next'
import "../firebaseconfig";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

function ArticleCard() {
  const [fileGroups, setFileGroups] = useState([]);
  const {i18n} = useTranslation();

  const langs = {
    en: "English",
    hi: "Hindi",
    kn: "Kannada",
    te: "Telugu",
    ta: "Tamil",
  };
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage);
        const fileList = await listAll(storageRef);

        const groupedFiles = {};
        await Promise.all(
          fileList.prefixes.map(async (directoryRef) => {
            const directory = directoryRef._location.path_;
            // Check if the directory matches the current language
            if (directory.includes(langs[currentLanguage])) {
              const directoryFiles = await listAll(ref(storage, directory));
              groupedFiles[directory] = await Promise.all(
                directoryFiles.items.map(async (fileRef) => {
                  const downloadUrl = await getDownloadURL(fileRef);
                  return { name: fileRef.name, url: downloadUrl };
                })
              );
            }
          })
        );

        setFileGroups(groupedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [currentLanguage]); // Fetch files when the language changes

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Create an object URL from the Blob
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", filename);

      // Trigger the click event to download the file
      link.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      {Object.entries(fileGroups).map(
        ([category, files]) =>
          category !== "Audios" && (
            <Box key={category} sx={{ p: 1 }}>
              <Typography
                textAlign="center"
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Poppins"
                fontWeight="bold"
                fontSize="30px"
                backgroundColor="#04AA6D"
                height="auto"
                borderLeft="15px solid #F1592A"
              >
                {category}
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={10}>
                {files.map((file, index) => (
                  <Card
                    key={index}
                    sx={{
                      maxWidth: 345,
                      p: 3,
                      backgroundColor: "lightgray",
                      borderRadius: 2,
                    }}
                    variant="outlined"
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      sx={{ borderRadius: 2 }}
                      image="https://img.freepik.com/premium-vector/red-pdf-file-download-upload-template_79145-767.jpg"
                      // alt = {Image for${file.name}}
                    />
                    <CardContent>
                      <Typography
                        textAlign="center"
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontFamily="Poppins"
                        fontWeight="bold"
                        fontSize="30px"
                      >
                        {file.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        sx={{
                          backgroundColor: "#2e5b1a",
                          p: "10px",
                          borderRadius: "14px",
                          width: "170px",
                          color: "white",
                          fontFamily: "Poppins",
                          marginLeft: "13%",
                          transition: "background-color 2s ease",
                          "&:hover": {
                            backgroundColor: "black",
                            height: "40px",
                          },
                        }}
                        size="medium"
                        onClick={() => handleDownload(file.url, file.name)}
                      >
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Box>
          )
      )}
    </div>
  );
}

export default ArticleCard;