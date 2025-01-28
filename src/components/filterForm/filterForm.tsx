// components/FilterForm.tsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useFilterContext } from "../context/FilterContext";
import { fetchTestTopicData } from "../../services/api";
import { TestTopic } from "../../models";

const FilterForm: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const [testTypes, setTestTypes] = useState<TestTopic[]>([]);

  const filteredTestTypesBySubject = useMemo(() => {
    const seenSubjects = new Set<string>();
    const uniqueSubjects: TestTopic[] = [];

    for (const topic of testTypes) {
        if (!seenSubjects.has(topic.subject)) {
            seenSubjects.add(topic.subject);
            uniqueSubjects.push(topic);
        }
    }

    return uniqueSubjects;
  }, [testTypes]);

  const filteredTestTypesByTopic = useMemo(() => {
    const seenTopics = new Set<string>();
    const uniqueTopics: TestTopic[] = [];

    for (const topic of testTypes) {
        if (!seenTopics.has(topic.topic)) {
            seenTopics.add(topic.topic);
            uniqueTopics.push(topic);
        }
    }

    return uniqueTopics;
  }, [testTypes]);

  const filteredTestTypesBySubtopic = useMemo(() => {
    const seenSubtopics = new Set<string>();
    const uniqueSubtopics: TestTopic[] = [];

    for (const topic of testTypes) {
        if (!seenSubtopics.has(topic.subtopic)) {
            seenSubtopics.add(topic.subtopic);
            uniqueSubtopics.push(topic);
        }
    }    

    return uniqueSubtopics;
  }, [testTypes]);

  const filteredTestTypesBySpecificTopic = useMemo(() => {
    const seenSpecificTopics = new Set<string>();
    const uniqueSpecificTopics: TestTopic[] = [];        

    for (const topic of testTypes) {
        if (!seenSpecificTopics.has(topic.specific_topic)) {
            seenSpecificTopics.add(topic.specific_topic);
            uniqueSpecificTopics.push(topic);
        } 
    }

    return uniqueSpecificTopics;
  }, [testTypes]);

  // Load data dynamically based on selection
  useEffect(() => {
    fetchTestTopicData("", "").then(setTestTypes);
  }, []);

  // Handle selection changes
  const handleChange = (field: keyof typeof filters, value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "testType" && {
        subject: null,
        topic: null,
        subtopic: null,
        specificTopic: null,
      }),
      ...(field === "subject" && {
        topic: null,
        subtopic: null,
        specificTopic: null,
      }),
      ...(field === "topic" && { subtopic: null, specificTopic: null }),
      ...(field === "subtopic" && { specificTopic: null }),
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>
        Filter Questions
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="test-type-label">Test Type</InputLabel>
        <Select
          labelId="test-type-label"
          value={filters.testType || ""}
          onChange={(e) => handleChange("testType", e.target.value || null)}
        >
          {testTypes.map((type) => (
            <MenuItem key={type.id} value={type.test_type}>
              {type.test_type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filters.testType && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="subject-label">Subject</InputLabel>
          <Select
            labelId="subject-label"
            value={filters.subject || ""}
            onChange={(e) => handleChange("subject", e.target.value || null)}
          >
            {filteredTestTypesBySubject.map((subject) => (
              (subject.test_type === filters.testType || !filters.testType) && (
              <MenuItem key={subject.id} value={subject.subject}>
                {subject.subject}
              </MenuItem>
              )
            ))}
          </Select>
        </FormControl>
      )}

      {filters.subject && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="topic-label">Topic</InputLabel>
          <Select
            labelId="topic-label"
            value={filters.topic || ""}
            onChange={(e) => handleChange("topic", e.target.value || null)}
          >
            {filteredTestTypesByTopic.map(
              (topic) =>
                (topic.subject === filters.subject || !filters.subject) && (
                  <MenuItem key={topic.id} value={topic.topic}>
                    {topic.topic}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}

      {filters.topic && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="subtopic-label">Subtopic</InputLabel>
          <Select
            labelId="subtopic-label"
            value={filters.subtopic || ""}
            onChange={(e) => handleChange("subtopic", e.target.value || null)}
          >
            {filteredTestTypesBySubtopic.map(
              (subtopic) =>
                (subtopic.topic === filters.topic || !filters.topic) && (
                  <MenuItem key={subtopic.id} value={subtopic.subtopic}>
                    {subtopic.subtopic}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}

      {filters.subtopic && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="specific-topic-label">Specific Topic</InputLabel>
          <Select
            labelId="specific-topic-label"
            value={filters.specificTopic || ""}
            onChange={(e) =>
              handleChange("specificTopic", e.target.value || null)
            }
          >
            {filteredTestTypesBySpecificTopic.map(
              (specificTopic) =>
                (specificTopic.subtopic === filters.subtopic ||
                  !filters.subtopic) && (
                  <MenuItem
                    key={specificTopic.id}
                    value={specificTopic.specific_topic}
                  >
                    {specificTopic.specific_topic}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default FilterForm;
