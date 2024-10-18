from backend import create_app
from backend.main_route import main

app = create_app()
#host='129.21.118.199'
if __name__ == '__main__':
    app.run(host= '129.21.118.199',debug=True)