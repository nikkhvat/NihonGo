import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CryptoJS from 'crypto-js';

import { InitialState } from "./types";
import { getChapters, getHashChapters } from "./api";

const initialState: InitialState = {
  completedLesson: [],
  chapters: [],
  hash: null,
  lang: "en",
  lastUpdate: 0,
};

const getObjectHash = (obj: Object) => {
  const jsonString = JSON.stringify(obj);
  return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
};

export const updateLessons = createAsyncThunk("LESSONS/UPDATE_LESSONS",
  async ({ lang }: { lang: string }) => {
    try {
      const { data, status } = await getChapters(lang);

      if (status === 200) {
        return {
          ok: true,
          chapters: data.chapters,
          lang: lang
        }
      }
    } catch (error) {
      console.error(error)
    }

    return { ok: false }
  }
);

export const checkLessons = createAsyncThunk("LESSONS/CHECK_LESSONS",
  async ({ lang, hash }: { lang: string, hash: string }) => {
    try {
      const { checkData, checkStatus } = await getHashChapters(lang);

      if (checkStatus !== 200 || checkData.hash === hash) return { ok: false }

      const { data, status } = await getChapters(lang);

      if (status === 200) {
        return {
          ok: true,
          chapters: data.chapters,
          lang: lang
        }
      }
    } catch (error) {
      console.error(error)
    }

    return { ok: false }
  }
);

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    clearStateLessons: () => initialState,
    completeLesson: (state, action) => {
      state.completedLesson = [...state.completedLesson, action.payload];
    },
    setChapters: (state, action) => {
      state.chapters = action.payload.chapters
      state.lang = action.payload.lang
      state.lastUpdate = +new Date()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateLessons.fulfilled, (state, action) => {
      if (action.payload?.ok) {
        state.chapters = action.payload?.chapters
        state.lastUpdate = +new Date()
        state.lang = action.payload.lang as "en"
        state.hash = getObjectHash(action.payload?.chapters);
      }
    })
    builder.addCase(checkLessons.fulfilled, (state, action) => {
      if (action.payload?.ok) {
        state.chapters = action.payload?.chapters
        state.lastUpdate = +new Date()
        state.lang = action.payload.lang as "en"
        state.hash = getObjectHash(action.payload?.chapters);
      }
    })
  }
});

export const { completeLesson, setChapters, clearStateLessons } = lessonsSlice.actions;

export default lessonsSlice.reducer;