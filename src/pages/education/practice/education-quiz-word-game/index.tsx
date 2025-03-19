import React from "react";

import { RouteProp } from "@react-navigation/native";

import { EducationPracticeContextProvider } from "./lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "./lib/context/education-statistic-context";
import EducationWordGame from "./ui/education-practice";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootStackParamList } from "@/app/navigationTypes";
import { ROUTES } from "@/app/navigationTypes";

type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.PRACTICE_WORD_GAME>;

interface LearnScreenProps {
  route: LearnScreenRouteProp
}

const EducationWordGamePage: React.FC<LearnScreenProps> = ({ route }) => {

  return (
    <EducationPracticeContextProvider>
      <EducationStatisticContextProvider>
        <AdaptiveLayout style={{ flex: 1 }} >
          <EducationWordGame route={route} />
        </AdaptiveLayout>
      </EducationStatisticContextProvider>
    </EducationPracticeContextProvider>
  );
};

export default EducationWordGamePage;