# Flowshop Heuristics

Sample heuristic approaches for solving the Flowshop makespan problem.

# The Flowshop Problem
Scheduling optimization deals with a practical problem in developing an optimal 
flow of tasks through a system.  Classically, (and due to the close tie to 
manufacturing) these tasks are typically referred to as “jobs” with the processing 
stations referred to as “machines”.  Within this family of problems are several 
classical models of scheduling depending on the fixed and dynamic aspects of the 
overall problem.  The Flow shop Scheduling problem (hereto referred to as FSP) 
is a classical scheduling problem where jobs are executed in the same order on 
all machines, however, they do not share the same execution time on all machines.  
For example, think of the (waterfall) software development process.  As issues 
(jobs) are presented for fix, they must undergo the same series of steps 
(machines) in the same high-level ordering (e.g. requirements development, design 
construction, implementation, testing, and deployment), however, each issue has 
differing processing times for each step in the process.  Numerous other examples 
of this classic flow abound.

While this seems to be a simplistic problem, FSP as a classical problem from 
optimization and operations research has shown to be NP-complete [13].  Practically, 
what this means is that no definitive algorithm has been found in polynomial time 
that solves this problem for more than 3 machines.  Simplistically, for an example of 
2 machines and 2 jobs you can see that there are only 2 options for ordering {J1,J2} 
and {J2, J1}.  For this case, it is quite simple to take a brute force approach and 
“try” the two individual cases.  However, the observation from this is that this 
approach requires looking at (jobs!)^mcn-1 task which for a 2x2 problem is small; 
but as seen from {Table 1} grows very large rather quickly.  If we assume that we 
use the fastest desktop systems, today (roughly 177,730,000,000 instruction per second) 
and that we can somehow process these as a single “instruction” within the computer 
you can see how the issue scales.  (Note that the age of the universe is thought to 
be only 13.7x10^9 years.)  Obviously, any such brute force attempts will quickly fail.  
That is not to say that the problem cannot be solved – just that we need heuristic 
methods to address the problem and find a “reasonable solution”.

More formally, FSP consists of n-jobs running on m-machines in a fixed sequence; 
that is, each job must run on machine m1 followed by machine m2, up through machine 
mm.  Further, the jobs cannot be preempted, meaning that a job, once started on a 
machine, must complete fully before starting the next job on that machine. Given 
the run times of each of the jobs on each machine, the problem is to create an 
optimal sequence of jobs that minimizes the total run time of the system, or makespan, 
defined as the time from the start of the first job until the finish time of the 
last job.

As a mathematical model, an instance of FSP can be expressed as:  Let J = the set 
of jobs 1,…n and M = the set of machines 1,…m.  We are given values for Pi,j as the 
processing time for job j on machine i again, given that j∈J and i ∈M.  Further, we 
define Ti,j as the start time of job j on machine i given that j∈J and i ∈M and a 
binary value  xj,k , valued at 1 if job j precedes job k, otherwise valued at 0. 
The problem now becomes:

    (A1) min Cmax  ≥ Tm,j + Pm,j forall j
    (A2) Subj to: Ti,j + Pi-1,j ≤ Ti,j ; for j∈J and i ∈{2..m},
    (A3) Ti,j + Pi,j ≤ Ti,k + ε(1-xj,k) for all i,j,k and ε is an arbitrarily large number,
    (A4) Ti,k + Pi,k ≤ Ti,j + ε (xj,k) for all i,j,k and ε is an arbitrarily large number

Clearly, it can be seen from this problem description that there are practical 
applications of scheduling and minimization of “down-time”, considered the idle 
time that machines spend not processing a job

# Eigen Ant

In the most basic application of Ant Colony Optimization (ACO), a set of artificial
ants find the shortest path between a source and a destination. Ants deposit pheromone
on paths they take, preferring paths that have more pheromone on them. Since shorter paths
are traversed faster, more pheromone accumulates on them in a given time, attracting more
ants and leading to reinforcement of the pheromone trail on shorter paths. This is a positive
feedback process that can also cause trails to persist on longer paths, even when a shorter
path becomes available. To counteract this persistence on a longer path, ACO algorithms
employ remedial measures, such as using negative feedback in the form of uniform evaporation
on all paths. Obtaining high performance in ACO algorithms typically requires fine
tuning several parameters that govern pheromone deposition and removal. This solution uses
a new ACO algorithm, called EigenAnt, for finding the shortest path between a source
and a destination, based on selective pheromone removal that occurs only on the path that is
actually chosen for each trip. Shortest path is the only stable equilibrium for EigenAnt, 
which means that it is maintained for arbitrary initial pheromone concentrations 
on paths, and even when path lengths change with time. The EigenAnt algorithm uses
only two parameters and does not require them to be finely tuned. 

    1: Initialize trip counter vector J = (Ji ) = 0.
    2: Initialize total ant trip counter t = 1. Choose Jmax ∈ N, the total number of ant trips.
    3: Initialize path i with pheromone concentration: Cti = (1/n), i = 1, . . . , n.
    4: Initialize probability of choosing the ith path: pti = (1/n), i = 1, . . . , n.
    5: Initialize the weights di as 1/Li, where Li is the length of the ith path.
    6: Choose the pheromone removal parameter, α and the pheromone deposition parameter, β.
    7: while i Ji ≤ Jmax do
    8: Choose a path randomly in accordance with the distribution of probabilities pt j , j =1, . . . , n.
    9: if the ith path is chosen then
    10: Update the trip counter of the ith path: Ji←Ji+ 1.
    11: Update pheromone only on path i: Ct+1 i ←(1−α)Ct i + βdipt i .
    12: No changes in pheromone on paths j = i: Ct+1 j = Ct j .
    13: end if
    14: Update path choice probabilities: pt+1 i ← Ct+1 i n j=1 Ct+1 j , i = 1, . . . , n.
    15: Update total ant trip counter: t ←t +1.
    16: end while
    17: Return normalized pheromone concentrations matrix (pt i versus trip t ) and final trip counter vector J.

## Setting up

From this directory:

1) Install the dependencies:
    
    $ npm install
    
2) Launch the app from the Terminal:

    $ npm start

## Installation details

### Required:
* [nodejs](https://nodejs.org/)
* npm (comes with nodejs)