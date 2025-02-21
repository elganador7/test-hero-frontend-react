import React, { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { TestTopic } from "../../models/TestTopic";
import styles from "./Settings.module.scss";
import { getTestTopics } from "../../services/api";
import FilterSelect from "../../components/common/FilterSelect";
import { useSettingsStore } from "../../store/useSettingsStore";

const Settings: React.FC = () => {
  const { filters, setFilter, clearFilter } = useSettingsStore();

  const { data: allTopics, isLoading, error } = useQuery({
    queryKey: ["topics"],
    queryFn: getTestTopics,
  });

  const testTypes = useMemo(() => {
    if (!allTopics) return [];
    return Array.from(new Set(allTopics.map(topic => topic.test_type)));
  }, [allTopics]);

  const availableSubjects = useMemo(() => {
    if (!allTopics || !filters.testType) return [];
    
    return Array.from(
      new Set(
        allTopics
          .filter(topic => topic.test_type === filters.testType)
          .map(topic => topic.subject)
      )
    );
  }, [allTopics, filters.testType]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load settings</Alert>;

  return (
    <Container maxWidth="md">
      <Box className={styles.container}>
        <Typography variant="h4" className={styles.settingsHeader}>
          Practice Settings
        </Typography>

        <Card className={styles.settingsCard}>
          <CardContent>
            <FilterSelect
              value={filters.testType}
              options={testTypes}
              onChange={(value) => {
                setFilter("testType", value as string)
                if (value !== filters.testType) {
                  clearFilter("subjects")
                }
              }}
              onClear={() => {
                clearFilter("testType");
                clearFilter("subjects");
              }}
            />

            {filters.testType && (
              <Box sx={{ mt: 3 }}>
                <FilterSelect
                  value={filters.subjects}
                  options={availableSubjects}
                  onChange={(value) => setFilter("subjects", [value as string])}
                  onClear={() => clearFilter("subjects")}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Settings; 