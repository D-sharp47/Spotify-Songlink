import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { Button, Grid } from "@mui/material";
import GroupCard, { GroupProps } from "../components/GroupCard";
import Modal from "../components/Modal";
import CreateGroup from "../components/CreateGroup";
import { getAllGroups } from "../util/api";

const GroupsPage: React.FC = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = useSelector((state: any) => state.auth.user?._id); // Adjusted selector for user ID
  const [showGroupModal, setShowGroupModal] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);

  const { data: groups, isLoading: loadingGroups } = useQuery({
    queryKey: ["groups", "allGroups"],
    queryFn: getAllGroups,
    enabled: isLoggedIn,
    staleTime: 30 * 60 * 1000,
  });

  const handleWebSocketMessage = (message: MessageEvent) => {
    const data = JSON.parse(message.data);
    if (data.message === "groupDataChanged") {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    }
  };

  const { sendJsonMessage } = useWebSocket("ws://localhost:8000", {
    onMessage: handleWebSocketMessage,
    queryParams: { userId },
  });

  useEffect(() => {
    sendJsonMessage({ type: "register", userId });
  }, [sendJsonMessage, userId]);

  const toggleGroupModal = () => {
    setShowGroupModal(!showGroupModal);
  };

  return (
    <>
      {loadingGroups ? (
        <p style={{ textAlign: "center", color: "white" }}>Loading Groups...</p>
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ mb: "10%" }}>
          {groups.map((group: GroupProps) => (
            <Grid item sm={6} md={4} lg={3} key={group._id}>
              <GroupCard
                _id={group._id}
                name={group.name}
                members={group.members}
                playlists={group.playlists}
                settings={group.settings}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        size="large"
        onClick={toggleGroupModal}
        sx={{
          my: "1rem",
          ml: "1rem",
          backgroundColor: "#47a661",
          "&:hover": {
            backgroundColor: "#367a4e", // Your custom color for hover state
          },
          color: "white",
        }}
      >
        Create Group
      </Button>
      <Modal
        title="Create Group"
        isOpen={showGroupModal}
        maxWidth="md"
        dismissDialog={toggleGroupModal}
        contents={<CreateGroup toggleGroupModal={toggleGroupModal} />}
      />
    </>
  );
};

export default GroupsPage;
