import { useState } from "react";
import Button from "../../../../../components/Button/Button";
import Modal from "../../../../../components/Modal/Modal";
import { useAnswerQuestionMutation, useGetSessionQuestionsQuery } from "../../../../../redux/slices/sessionsApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import type { QuestionsPageProps } from "./QuestionsPage.types";
import RoleGuard from "../../../../../hoc/RoleGuard";
import { ROLES } from "../../../../../types/Roles";

const QuestionsPage = ({ onClose, sessionId }: QuestionsPageProps) => {

    const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);

    const { data: questions, isLoading } = useGetSessionQuestionsQuery(sessionId);

    const [answerQuestion, { isLoading: isAnswering }] = useAnswerQuestionMutation();


    const handleAnswer = async (questionId: string) => {

        setAnsweringQuestionId(questionId);

        try {
            await answerQuestion(questionId).unwrap();

            snack.success("Question answered");

        } catch (e: any) {
            snack.error(e?.data?.error?.message || "Something went wrong");
        } finally {
            setAnsweringQuestionId(null);
        }
    };


    return (
        <Modal closeModal={onClose}>
            <div>
                <h2>Questions</h2>

                {isLoading && <p>Loading questions...</p>}

                {!isLoading && questions?.length === 0 && (
                    <p>No questions asked</p>
                )}

                {questions?.map((question) => (
                    <div key={question.id}>
                        <h4>{question.student.name}</h4>

                        <p>{question.body}</p>

                        <p>Status: {question.answered ? "Answered" : "Not Answered"}</p>

                        <span>{new Date(question.createdAt).toLocaleString()}</span>

                        <RoleGuard allowed={[ROLES.INSTRUCTOR]}>
                            {!question.answered && (
                                <Button
                                    variant="success"
                                    onClick={() => handleAnswer(question.id)}
                                    disabled={
                                        isAnswering &&
                                        answeringQuestionId === question.id
                                    }
                                >
                                    {
                                        isAnswering &&
                                            answeringQuestionId === question.id
                                            ? "Answering..."
                                            : "Answer"
                                    }
                                </Button>
                            )}
                        </RoleGuard>

                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default QuestionsPage;