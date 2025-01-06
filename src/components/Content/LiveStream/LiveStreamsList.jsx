import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Spinner,
  Button,
} from "reactstrap";
import {
  useGetLiveStreamsQuery,
  useUpdateLiveStreamMutation
} from "../../../redux/features/LiveStream/liveStreamApi";

// Helper function to format date
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const LiveStreamsList = () => {
  const { data: liveStreamsData, isLoading, error } = useGetLiveStreamsQuery();
  const [updateLiveStream] = useUpdateLiveStreamMutation();

  const liveStream = liveStreamsData?.latestStream;

  if (isLoading) return <Spinner color="primary" />;
  if (error) return <p className="text-danger">Failed to load live streams.</p>;
  if (!liveStream) return <p>No active live streams found.</p>;

  // Format the createdAt date
  const createdAtFormatted = formatDate(liveStream.createdAt);

  // Handle Deactivate/Activate
  const handleToggleActive = async () => {
    try {
      await updateLiveStream({
        id: liveStream._id,
        isActive: !liveStream.isActive,
      }).unwrap();
    } catch (error) {
      console.error("Error updating live stream status", error);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      await deleteLiveStream(liveStream._id).unwrap();
      alert("Live stream deleted successfully!");
    } catch (error) {
      console.error("Error deleting live stream", error);
    }
  };

  return (
    <Container fluid>
      <h4>Active Live Stream</h4>
      <Card key={liveStream._id}>
        <CardBody>
          <CardTitle>{liveStream.title}</CardTitle>
          <p>{liveStream.description}</p>
          <a
            href={liveStream.streamLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Live
          </a>
          <p className="mt-2">
            <strong>Created At:</strong> {createdAtFormatted}
          </p>

          {/* Deactivate/Activate Button */}
          <Button
            color={liveStream.isActive ? "danger" : "success"}
            onClick={handleToggleActive}
          >
            {liveStream.isActive ? "Deactivate" : "Activate"}
          </Button>

    
        </CardBody>
      </Card>
    </Container>
  );
};

export default LiveStreamsList;
