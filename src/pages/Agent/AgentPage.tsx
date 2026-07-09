import { useState } from "react";
import { sendMessage } from "./agent";
import Form from "../../components/Form/Form";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Form/FormInput/FormInput";
import type { AgentData } from "./AgentPage.types";
import Button from "../../components/Button/Button";
import styles from "./AgentPage.module.scss";

const AgentPage = () => {

  const [response, setResponse] = useState("");
  const [progress, setProgress] = useState<any[]>([]);

  const methods = useForm<{ message: string }>({ defaultValues: { message: "" } });

  const handleSend = async (data: { message: string }) => {

    setProgress([]);


    await sendMessage("Testing", data.message, (event) => {
      switch (event.type) {
        case "text_delta":
          setResponse(prev => prev + event.text);
          break;

        case "tool_result":
          if (event.name === "get_my_progress") {
            setProgress(event.output as any[]);
          }
          break;
          
        case "done":
          console.log("completed");
          break;


        case "conversation_id":

          console.log(
            "Conversation:",
            event.id
          );

          break;

      }

    }

    );
  };


  return (
    <div>

      <h2>Bewda Agent</h2>


      <p>{response}</p>


      {
        progress.map(course => (
          <div key={course.courseId}>
            <h3>{course.courseTitle}</h3>
            {
              course.assignments.map((assignment: any) => (
                <p key={assignment.id}>{assignment.title}-{assignment.submitted ? "Submitted" : "Pending"}</p>
              ))
            }
          </div>
        ))
      }



      <Form methods={methods} onSubmit={handleSend} className={styles.agentInputForm}>
        <FormInput<AgentData>
          name="message"
          label="Ask anything but the answer will be same"
          placeholder="Mitochondria is the powerhouse of the cell"
        />
        <Button variant="secondary">Send</Button>
      </Form>

    </div>
  )

}

export default AgentPage;