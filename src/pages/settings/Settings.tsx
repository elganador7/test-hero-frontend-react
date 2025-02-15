import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { TestTopic } from "../../models/TestTopic";
import styles from "./Settings.module.scss";
import { api } from "../../services/api";
import FilterSelect from "../../components/common/FilterSelect";
import { useSettingsStore } from "../../store/useSettingsStore";

const Settings: React.FC = () => {
  const { filters, setFilter, clearFilter } = useSettingsStore();

  const { data: allTopics, isLoading, error } = useQuery({
    queryKey: ['testTopics'],
    queryFn: async () => {
      const response = await api.get<TestTopic[]>("/test_topics/");
      return response.data;
    }
  });

  const getUniqueValues = (field: keyof TestTopic): string[] => {
    if (!allTopics) return [];
    const values = new Set(
      allTopics.map((topic) => String(topic[field]))
    );
    return Array.from(values).sort();
  };

  const getFilteredValues = useCallback((field: keyof TestTopic): string[] => {
    if (!allTopics) return [];
    let filteredTopics = [...allTopics];

    if (filters.testType) {
      filteredTopics = filteredTopics.filter(
        (topic) => String(topic.test_type) === filters.testType
      );
    }
    if (filters.subjects.length > 0) {
      filteredTopics = filteredTopics.filter((topic) =>
        filters.subjects.includes(String(topic.subject))
      );
    }
    if (filters.topics.length > 0) {
      filteredTopics = filteredTopics.filter((topic) =>
        filters.topics.includes(String(topic.topic))
      );
    }
    if (filters.subtopics.length > 0) {
      filteredTopics = filteredTopics.filter((topic) =>
        filters.subtopics.includes(String(topic.subtopic))
      );
    }

    const values = new Set(
      filteredTopics.map((topic) => String(topic[field]))
    );
    return Array.from(values).sort();
  }, [allTopics, filters]);

  const savePreferences = async () => {
    try {
      await api.post("/user/preferences", filters);
      // Show success message
    } catch (error) {
      console.error("Failed to save preferences:", error);
      // Show error message
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load topics</Alert>;
  if (!allTopics) return null;

  return (
    <Container maxWidth="md">
      <Box className={styles.container}>
        <Typography variant="h4" color="primary" gutterBottom>
          Practice Settings
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Configure your practice preferences by selecting the types of questions
          you want to focus on.
        </Typography>

        <Card className={styles.settingsCard}>
          <CardContent>
            <FilterSelect
              label="Test Type"
              value={filters.testType}
              options={getUniqueValues("test_type")}
              onChange={(value) => setFilter("testType", value as string)}
              onClear={() => clearFilter("testType")}
            />

            <FilterSelect
              label="Subjects"
              value={filters.subjects}
              options={getFilteredValues("subject")}
              multiple={true}
              onChange={(value) => setFilter("subjects", value as string[])}
              onClear={() => clearFilter("subjects")}
            />

            <FilterSelect
              label="Topics"
              value={filters.topics}
              options={getFilteredValues("topic")}
              multiple={true}
              onChange={(value) => setFilter("topics", value as string[])}
              onClear={() => clearFilter("topics")}
            />

            <FilterSelect
              label="Subtopics"
              value={filters.subtopics}
              options={getFilteredValues("subtopic")}
              multiple={true}
              onChange={(value) => setFilter("subtopics", value as string[])}
              onClear={() => clearFilter("subtopics")}
            />

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={savePreferences}
                size="large"
              >
                Save Preferences
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Settings; 