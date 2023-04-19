![Screen Shot 2023-04-18 at 5 04 47 PM](https://user-images.githubusercontent.com/114263701/232930440-20331a5c-becb-4fbb-bded-d024ae0d3d9a.png)

# CodePen GPT
---

CodePen GPT is a powerful React Single Page Application (SPA) that integrates OpenAI's API to generate code snippets based on user input. The generated code is then placed into CodeMirror editors, allowing users to quickly test and demo their code in real-time. The output is displayed in an i-frame, providing a seamless experience similar to popular platforms like CodePen and Code Sandbox..

![CodePen GPT Demo](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNhN2I4ZTVhMDUxOTE1NjkyZmRkYzEzOTY4ODcyYjUxNzE1NzA0MiZjdD1n/6YG8irt0mUWZEYY114/giphy.gif)

## Features

- Utilizes OpenAI's API to generate code snippets based on user input
- CodeMirror editors for HTML, CSS, and JavaScript
- In-browser linting for JavaScript with auto-correct
- In-editor search (command/ctrl F)
- rainbowBrackets custom CodeMirror Extension for colored scope
- Real-time code execution and output display in an i-frame
- Track session cost rounded to nearest penny.
- Responsive design for a seamless experience on various devices
- Download your code to an html file.

## Tech Stack

<div style="text-align: center">
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=React&color=222222&logo=React&logoColor=61DAFB&label=" alt="React"/>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=CodeMirror&color=D30707&logo=CodeMirror&logoColor=FFFFFF&label=" alt="CodeMirror"/>
  <img src="https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=" alt="React"/>
</div>

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- An OpenAI API key (soon), preferably GPT4

### Installation

1. Clone the repository:

```bash
git clone https://github.com/eriknewland/codepen-gpt.git
```

2. Change to the project directory:

```bash
cd codepen-gpt
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

## Usage

1. Enter your desired code generation prompt in the input field located in the top right corner.
2. Click the "Call API" button to generate code snippets based on your input.
3. The generated code will be placed into their respective CodeMirror editors (HTML, CSS, and JavaScript).
4. The output will be displayed in the i-frame below the editors in real-time.
5. You can edit the code in the editors and see the changes in the output instantly.
6. Save your code snippets by downloading everything to a simple html file to use in your favorite desktop editor.

## Roadmap

- Implement CSS and HTML linting
- Implement a better way to share
- Implement theme changing

## Contributing

Contributions to CodePen GPT are always welcome! If you'd like to contribute, please follow these steps:

1. Create a new branch with a descriptive name.
2. Make your changes and commit them with a clear and concise commit message. See the Issue Templates if you need a good place to start.
3. Push your changes to your newly created branch
4. Create a pull request, detailing the changes you made and why.

## License

[MIT License](./LICENSE).

## Acknowledgements

- [OpenAI](https://www.openai.com/) for their powerful API
- [CodeMirror](https://codemirror.net/) for their versatile code editor and amazing community.
- [CodePen](https://codepen.io/) and [Code Sandbox](https://codesandbox.io/) for inspiring this project