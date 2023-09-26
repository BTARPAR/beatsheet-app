# BeatSheet Exercise Starter

This guide provides instructions on how to run the beetsheet backend in a docker container.
Before starting the Next App, let start our APIs.
## Requirements

To use this Docker container, you will need to have Docker installed on your system. If you do not have Docker installed, you can download it from [here](https://www.docker.com/products/docker-desktop).

## How to Run Docker Compose

Run the following command to create the Docker container:

```bash
docker compose create
```

Run the following command to start the Docker container:

```bash
docker compose start
```

Alternatively, you can create and start the container by running:

```bash
docker compose up
```

This command will start the Docker container defined in the `docker-compose.yml` file. The BeatSheet API will be accessible at the port defined in the `docker-compose.yml` file.

## Stopping and Removing Containers

To stop the Docker container, you can run:

```bash
docker compose stop
```

This command will stop the running Docker container.

If you also want to remove the Docker container after stopping it, you can run:

```bash
docker compose down
```

This command will stop and remove the Docker container. Please note that any data not stored in a volume will be lost.

## Notes

Please ensure that the port defined in the `docker-compose.yml` file is not being used by any other applications to avoid any port conflict.

# BeatSheet-App

- Based on the requirement, I tried a different approach for one part of the assignment.
- I made it, so user can click and drag to pick a time for a beat in a page `/beat/${id}`.
- User just hover over the timeline, pick a starting point, and then drag to set the beat's duration.
- This might not be very clear for people making content, because the more beats they create the more they have to scroll down to see each beat.
- But I wanted to make an interface where they have access to all their beats visually, and this one does that.
- To keep things moving, I focused on the list of functionalities for now. But there's still a lot we can do to make this app look and work even better.
- I made a list below, but it's not everything we can do.



## Running the app
1. First, make sure the backend (the part that handles data) is up and running. You can do this by following the steps below. 
2. Open your terminal and make sure you're in the "beatsheet-app" folder. 
3. Install the necessary dependencies by typing in 
```bash
npm i 
``` 
4. Start the development server by typing in
```bash
npm run dev
```  
5. Finally, go to `http://localhost:3000` in your web browser. If this host is taken then check you terminal, it will show you on which url application is running.

## Features included in this app
1. List all acts and all their subsequent beats (Homepage) 
2. List the beats in a specific act (`beats/${id}` page)
3. Create a new act (Homepage)
4. Delete an act (Will also delete all the subsequent beats associated with) (Homepage)
5. Create a beat in an act (Homepage)
6. Update a beat in an existing act  (`beats/${id}` page)

## Todos:
- Style for mobile
- Display the time range when user edit the beat. Also, they can update the range as well.
- Manage the action of selecting timeframe for beat from where it was initially clicked to left or right direction. Right now user can only select timeframe to the right of where they started.
- When user move your mouse over the Timeframe component, the time display underneath Time Grid Indicator. It's not updating smoothly.
- Make the window that pops up for adding beat details look better and more appealing.
- When user add **Act**, since the act is newly build, it doesn't have any beat and because of that on homepage we are not able to show any beats for that ACT. To fix it when new beat will get create, I will default time or total time of ACT so that, we can show user newly added  Act with timeline.
- Since app wil getting bigger and bigger, I will also shift my focus on making sure that all component props and data are fully typed. There are few place I have ignored typescripts rule to unblock my progress.