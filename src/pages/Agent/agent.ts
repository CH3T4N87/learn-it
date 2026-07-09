export type AgentEvent =
  | {
      type: "text_delta";
      text: string;
    }
  | {
      type: "tool_call";
      id: string;
      name: string;
      input: unknown;
    }
  | {
      type: "tool_result";
      id: string;
      name: string;
      output: unknown;
    }
  | {
      type: "done";
    }
  | {
      type: "conversation_id";
      id: string;
    };


export async function sendMessage(
  conversationId: string,
  message: string,
  onEvent: (event: AgentEvent) => void
) {

  const response = await fetch(
    "https://xhkrpfff-4000.inc1.devtunnels.ms/agent/messages",
    {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
        conversationId,
        message
      })
    }
  );


  if(!response.ok){
    throw new Error("Request failed");
  }


  if(!response.body){
    throw new Error("No response body");
  }


  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer="";


  while(true){

    const {value,done}=await reader.read();

    if(done) break;


    buffer += decoder.decode(value,{stream:true});


    const events=buffer.split("\n\n");

    buffer=events.pop() ?? "";


    for(const event of events){

      const line=event
        .split("\n")
        .find(line=>line.startsWith("data:"));


      if(!line) continue;


      const payload=JSON.parse(
        line.replace("data:","").trim()
      );


      onEvent(payload);

    }
  }
}